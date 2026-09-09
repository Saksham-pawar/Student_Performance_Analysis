/* ===========================================================
   Student Performance Analysis
   Rule-based prediction — see README.md for the full formula.
=========================================================== */

(function () {
  "use strict";

  /* -----------------------------------------------------------
     Config: weights & thresholds (tweak these to recalibrate)
  ----------------------------------------------------------- */
  const WEIGHTS = {
    previousGrade: 0.40,
    attendance: 0.20,
    studyHours: 0.20,
    assignments: 0.20
  };

  // Weekly study hours above this are treated as fully "capped" credit.
  const STUDY_HOURS_CAP = 20;

  // Small nudge from class participation (+/- points), added after the
  // weighted core score is computed.
  const PARTICIPATION_ADJUST = { 1: -2, 2: 0, 3: 3 };

  const GRADE_BANDS = [
    { min: 85, letter: "A", label: "Excellent" },
    { min: 70, letter: "B", label: "Good" },
    { min: 55, letter: "C", label: "Satisfactory" },
    { min: 40, letter: "D", label: "Needs improvement" },
    { min: 0, letter: "F", label: "At serious risk" }
  ];

  const PASS_THRESHOLD = 40; // matches the D/F boundary above
  const AT_RISK_THRESHOLD = 55; // pass, but below "Satisfactory"

  /* -----------------------------------------------------------
     DOM references
  ----------------------------------------------------------- */
  const form = document.getElementById("predict-form");
  const errorEl = document.getElementById("form-error");
  const sampleBtn = document.getElementById("sample-btn");
  const resetBtn = document.getElementById("reset-btn");

  const reportEmpty = document.getElementById("report-empty");
  const reportFilled = document.getElementById("report-filled");
  const scoreValue = document.getElementById("score-value");
  const stampEl = document.getElementById("stamp");
  const letterGradeEl = document.getElementById("letter-grade");
  const notesList = document.getElementById("notes-list");
  const teacherComment = document.getElementById("teacher-comment");

  const bars = {
    previous: { fill: document.getElementById("bar-previous"), value: document.getElementById("bar-previous-value") },
    attendance: { fill: document.getElementById("bar-attendance"), value: document.getElementById("bar-attendance-value") },
    study: { fill: document.getElementById("bar-study"), value: document.getElementById("bar-study-value") },
    assignments: { fill: document.getElementById("bar-assignments"), value: document.getElementById("bar-assignments-value") }
  };

  /* -----------------------------------------------------------
     Date in the masthead
  ----------------------------------------------------------- */
  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric"
    });
  }

  /* -----------------------------------------------------------
     Helpers
  ----------------------------------------------------------- */
  function clamp(n, min, max) {
    return Math.min(max, Math.max(min, n));
  }

  function letterFor(score) {
    for (const band of GRADE_BANDS) {
      if (score >= band.min) return band;
    }
    return GRADE_BANDS[GRADE_BANDS.length - 1];
  }

  function readInputs() {
    const previousGrade = parseFloat(document.getElementById("previous-grade").value);
    const attendance = parseFloat(document.getElementById("attendance").value);
    const studyHours = parseFloat(document.getElementById("study-hours").value);
    const assignments = parseFloat(document.getElementById("assignments").value);
    const participation = parseInt(document.getElementById("participation").value, 10);
    const name = document.getElementById("student-name").value.trim();

    return { previousGrade, attendance, studyHours, assignments, participation, name };
  }

  function validate(inputs) {
    const problems = [];
    if (Number.isNaN(inputs.previousGrade) || inputs.previousGrade < 0 || inputs.previousGrade > 100) {
      problems.push("Previous grade average must be between 0 and 100.");
    }
    if (Number.isNaN(inputs.attendance) || inputs.attendance < 0 || inputs.attendance > 100) {
      problems.push("Attendance rate must be between 0 and 100.");
    }
    if (Number.isNaN(inputs.studyHours) || inputs.studyHours < 0 || inputs.studyHours > 60) {
      problems.push("Weekly study hours must be between 0 and 60.");
    }
    if (Number.isNaN(inputs.assignments) || inputs.assignments < 0 || inputs.assignments > 100) {
      problems.push("Assignment completion must be between 0 and 100.");
    }
    return problems;
  }

  /* -----------------------------------------------------------
     Prediction
  ----------------------------------------------------------- */
  function predict(inputs) {
    const studyHoursScore = clamp(inputs.studyHours / STUDY_HOURS_CAP, 0, 1) * 100;

    const contributions = {
      previous: inputs.previousGrade * WEIGHTS.previousGrade,
      attendance: inputs.attendance * WEIGHTS.attendance,
      study: studyHoursScore * WEIGHTS.studyHours,
      assignments: inputs.assignments * WEIGHTS.assignments
    };

    const core = contributions.previous + contributions.attendance + contributions.study + contributions.assignments;
    const adjusted = clamp(core + PARTICIPATION_ADJUST[inputs.participation], 0, 100);

    return {
      score: Math.round(adjusted * 10) / 10,
      contributions,
      studyHoursScore
    };
  }

  function buildNotes(inputs, result) {
    const notes = [];

    if (inputs.attendance < 75) {
      notes.push({ type: "risk", text: "Attendance is below 75% — this is dragging the prediction down noticeably." });
    } else if (inputs.attendance >= 95) {
      notes.push({ type: "strength", text: "Attendance is excellent, close to full presence." });
    }

    if (inputs.studyHours < 5) {
      notes.push({ type: "risk", text: "Weekly study time is quite low; even a few extra hours could move the grade band." });
    } else if (inputs.studyHours >= 15) {
      notes.push({ type: "strength", text: "Study time is strong and is contributing close to its full weight." });
    }

    if (inputs.assignments < 60) {
      notes.push({ type: "risk", text: "Assignment completion is under 60% — missed work is a large factor here." });
    } else if (inputs.assignments >= 90) {
      notes.push({ type: "strength", text: "Assignment completion is close to full, a solid stabiliser for the grade." });
    }

    if (inputs.previousGrade < 40) {
      notes.push({ type: "risk", text: "Previous grades are already in a weak band, which weighs heavily on the estimate." });
    }

    if (inputs.participation === 3) {
      notes.push({ type: "strength", text: "High class participation nudged the score upward slightly." });
    } else if (inputs.participation === 1) {
      notes.push({ type: "risk", text: "Low class participation nudged the score down slightly." });
    }

    if (notes.length === 0) {
      notes.push({ type: "strength", text: "All factors are in a balanced, healthy range." });
    }

    return notes;
  }

  function buildComment(inputs, result, band) {
    const name = inputs.name || "This student";
    const first = name.split(" ")[0];

    if (result.score >= 85) {
      return `${first} is performing at a strong, consistent level across attendance, work completed, and prior results. Keep the current routine going.`;
    }
    if (result.score >= 70) {
      return `${first} is on solid footing overall, with room to tighten up one or two habits to push into the top band.`;
    }
    if (result.score >= 55) {
      return `${first} is passing but the margin is thin. A small, focused improvement in the weakest area below would help a lot.`;
    }
    if (result.score >= 40) {
      return `${first} is at risk of falling behind. The gap is closeable, but it will need attention soon, particularly in the flagged areas.`;
    }
    return `${first} is currently on track to fail. This needs immediate support — start with attendance and assignment completion, as they carry the most weight.`;
  }

  /* -----------------------------------------------------------
     Rendering
  ----------------------------------------------------------- */
  function renderResult(inputs, result) {
    const band = letterFor(result.score);

    reportEmpty.hidden = true;
    reportFilled.hidden = false;

    scoreValue.textContent = result.score.toFixed(1);
    letterGradeEl.textContent = `${band.letter} — ${band.label}`;

    stampEl.classList.remove("at-risk", "fail");
    if (result.score < PASS_THRESHOLD) {
      stampEl.textContent = "FAIL";
      stampEl.classList.add("fail");
    } else if (result.score < AT_RISK_THRESHOLD) {
      stampEl.textContent = "AT RISK";
      stampEl.classList.add("at-risk");
    } else {
      stampEl.textContent = "PASS";
    }

    // Bars show each factor's contribution as a percentage of its own max weight,
    // so every bar can independently reach 100%.
    const maxes = {
      previous: 100 * WEIGHTS.previousGrade,
      attendance: 100 * WEIGHTS.attendance,
      study: 100 * WEIGHTS.studyHours,
      assignments: 100 * WEIGHTS.assignments
    };

    Object.keys(bars).forEach((key) => {
      const pct = clamp((result.contributions[key] / maxes[key]) * 100, 0, 100);
      // Reset then animate on next frame so the transition actually plays.
      bars[key].fill.style.width = "0%";
      requestAnimationFrame(() => {
        bars[key].fill.style.width = pct.toFixed(0) + "%";
      });
      bars[key].value.textContent = Math.round(result.contributions[key]);
    });

    notesList.innerHTML = "";
    buildNotes(inputs, result).forEach((note) => {
      const li = document.createElement("li");
      li.textContent = note.text;
      li.className = note.type;
      notesList.appendChild(li);
    });

    teacherComment.textContent = buildComment(inputs, result, band);
  }

  function showError(messages) {
    errorEl.textContent = messages.join(" ");
    errorEl.hidden = false;
  }

  function clearError() {
    errorEl.hidden = true;
    errorEl.textContent = "";
  }

  /* -----------------------------------------------------------
     Events
  ----------------------------------------------------------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = readInputs();
    const problems = validate(inputs);

    if (problems.length) {
      showError(problems);
      return;
    }

    clearError();
    const result = predict(inputs);
    renderResult(inputs, result);
  });

  resetBtn.addEventListener("click", () => {
    clearError();
    reportFilled.hidden = true;
    reportEmpty.hidden = false;
  });

  sampleBtn.addEventListener("click", () => {
    document.getElementById("student-name").value = "Asha Rao";
    document.getElementById("previous-grade").value = "72";
    document.getElementById("attendance").value = "88";
    document.getElementById("study-hours").value = "9";
    document.getElementById("assignments").value = "81";
    document.getElementById("participation").value = "2";
    clearError();
  });
})();
