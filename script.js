/* ===========================================================
   Student Performance Analysis
   Machine Learning model: Multiple Linear Regression
   Trained from student_data.csv-style training data.
=========================================================== */
(function () {
  "use strict";

  // Training dataset (same data is also provided as student_data.csv).
  const DATASET = [{"Study Hours":12.2,"Attendance":56.1,"Previous Marks":55.1,"Assignments Completed":57.3,"Participation":3,"Final Marks":64.8},{"Study Hours":10.7,"Attendance":81.6,"Previous Marks":41.7,"Assignments Completed":50.2,"Participation":1,"Final Marks":57.2},{"Study Hours":10.1,"Attendance":56.2,"Previous Marks":50.9,"Assignments Completed":80.7,"Participation":3,"Final Marks":58.0},{"Study Hours":6.5,"Attendance":94.1,"Previous Marks":81.7,"Assignments Completed":53.8,"Participation":2,"Final Marks":71.1},{"Study Hours":7.4,"Attendance":62.0,"Previous Marks":92.6,"Assignments Completed":63.5,"Participation":1,"Final Marks":65.4},{"Study Hours":7.5,"Attendance":66.9,"Previous Marks":42.4,"Assignments Completed":70.3,"Participation":1,"Final Marks":52.8},{"Study Hours":17.6,"Attendance":72.0,"Previous Marks":70.4,"Assignments Completed":90.6,"Participation":3,"Final Marks":85.0},{"Study Hours":5.1,"Attendance":58.1,"Previous Marks":76.4,"Assignments Completed":87.5,"Participation":1,"Final Marks":60.1},{"Study Hours":15.7,"Attendance":94.0,"Previous Marks":60.9,"Assignments Completed":69.9,"Participation":2,"Final Marks":77.5},{"Study Hours":12.7,"Attendance":86.6,"Previous Marks":77.6,"Assignments Completed":48.9,"Participation":3,"Final Marks":77.6},{"Study Hours":4.7,"Attendance":87.8,"Previous Marks":49.0,"Assignments Completed":65.9,"Participation":3,"Final Marks":56.9},{"Study Hours":7.2,"Attendance":89.6,"Previous Marks":43.1,"Assignments Completed":90.2,"Participation":2,"Final Marks":59.4},{"Study Hours":8.4,"Attendance":58.0,"Previous Marks":90.2,"Assignments Completed":76.2,"Participation":3,"Final Marks":71.5},{"Study Hours":8.3,"Attendance":96.2,"Previous Marks":65.2,"Assignments Completed":59.6,"Participation":1,"Final Marks":69.1},{"Study Hours":13.9,"Attendance":79.3,"Previous Marks":81.1,"Assignments Completed":68.6,"Participation":3,"Final Marks":78.3},{"Study Hours":18.0,"Attendance":77.9,"Previous Marks":45.0,"Assignments Completed":47.6,"Participation":1,"Final Marks":64.6},{"Study Hours":4.4,"Attendance":62.2,"Previous Marks":77.4,"Assignments Completed":77.8,"Participation":2,"Final Marks":55.2},{"Study Hours":10.5,"Attendance":98.7,"Previous Marks":87.3,"Assignments Completed":45.6,"Participation":3,"Final Marks":85.0},{"Study Hours":3.8,"Attendance":94.8,"Previous Marks":81.3,"Assignments Completed":87.3,"Participation":2,"Final Marks":74.7},{"Study Hours":9.3,"Attendance":97.9,"Previous Marks":88.2,"Assignments Completed":59.5,"Participation":3,"Final Marks":81.5},{"Study Hours":14.2,"Attendance":77.8,"Previous Marks":45.9,"Assignments Completed":79.4,"Participation":3,"Final Marks":66.6},{"Study Hours":8.0,"Attendance":62.3,"Previous Marks":92.4,"Assignments Completed":95.7,"Participation":1,"Final Marks":73.9},{"Study Hours":11.6,"Attendance":77.0,"Previous Marks":46.2,"Assignments Completed":65.0,"Participation":2,"Final Marks":60.8},{"Study Hours":11.1,"Attendance":58.5,"Previous Marks":80.3,"Assignments Completed":89.9,"Participation":3,"Final Marks":77.7},{"Study Hours":14.3,"Attendance":60.8,"Previous Marks":66.1,"Assignments Completed":75.2,"Participation":2,"Final Marks":65.9},{"Study Hours":17.4,"Attendance":96.8,"Previous Marks":81.5,"Assignments Completed":82.9,"Participation":3,"Final Marks":90.2},{"Study Hours":7.0,"Attendance":99.8,"Previous Marks":75.7,"Assignments Completed":69.1,"Participation":3,"Final Marks":71.7},{"Study Hours":3.0,"Attendance":55.9,"Previous Marks":70.5,"Assignments Completed":77.4,"Participation":1,"Final Marks":55.4},{"Study Hours":3.1,"Attendance":83.4,"Previous Marks":52.6,"Assignments Completed":94.8,"Participation":2,"Final Marks":61.3},{"Study Hours":12.7,"Attendance":64.6,"Previous Marks":47.3,"Assignments Completed":96.5,"Participation":3,"Final Marks":68.4},{"Study Hours":11.2,"Attendance":65.9,"Previous Marks":66.0,"Assignments Completed":67.4,"Participation":1,"Final Marks":66.3},{"Study Hours":8.8,"Attendance":76.0,"Previous Marks":80.1,"Assignments Completed":82.0,"Participation":3,"Final Marks":76.7},{"Study Hours":3.6,"Attendance":73.1,"Previous Marks":58.7,"Assignments Completed":92.4,"Participation":1,"Final Marks":58.9},{"Study Hours":4.2,"Attendance":63.3,"Previous Marks":65.4,"Assignments Completed":93.1,"Participation":1,"Final Marks":62.3},{"Study Hours":9.1,"Attendance":93.8,"Previous Marks":70.3,"Assignments Completed":47.8,"Participation":3,"Final Marks":73.4},{"Study Hours":16.8,"Attendance":93.2,"Previous Marks":49.1,"Assignments Completed":71.7,"Participation":1,"Final Marks":64.3},{"Study Hours":15.8,"Attendance":95.6,"Previous Marks":49.1,"Assignments Completed":45.1,"Participation":2,"Final Marks":67.1},{"Study Hours":9.3,"Attendance":74.0,"Previous Marks":92.7,"Assignments Completed":99.7,"Participation":3,"Final Marks":88.3},{"Study Hours":12.6,"Attendance":76.9,"Previous Marks":50.4,"Assignments Completed":57.0,"Participation":1,"Final Marks":56.8},{"Study Hours":14.0,"Attendance":57.6,"Previous Marks":72.1,"Assignments Completed":72.7,"Participation":3,"Final Marks":70.9},{"Study Hours":4.5,"Attendance":98.2,"Previous Marks":44.4,"Assignments Completed":55.2,"Participation":3,"Final Marks":61.5},{"Study Hours":8.5,"Attendance":97.4,"Previous Marks":71.3,"Assignments Completed":76.8,"Participation":1,"Final Marks":73.4},{"Study Hours":11.9,"Attendance":73.9,"Previous Marks":72.1,"Assignments Completed":73.8,"Participation":2,"Final Marks":73.2},{"Study Hours":5.8,"Attendance":72.8,"Previous Marks":76.9,"Assignments Completed":61.5,"Participation":2,"Final Marks":68.1},{"Study Hours":16.9,"Attendance":97.1,"Previous Marks":40.5,"Assignments Completed":79.2,"Participation":3,"Final Marks":75.3},{"Study Hours":5.4,"Attendance":66.9,"Previous Marks":91.3,"Assignments Completed":93.4,"Participation":1,"Final Marks":70.9},{"Study Hours":7.9,"Attendance":62.1,"Previous Marks":85.9,"Assignments Completed":83.7,"Participation":3,"Final Marks":78.7},{"Study Hours":10.5,"Attendance":85.1,"Previous Marks":70.5,"Assignments Completed":96.2,"Participation":1,"Final Marks":73.4},{"Study Hours":17.0,"Attendance":61.0,"Previous Marks":46.3,"Assignments Completed":50.9,"Participation":3,"Final Marks":64.8},{"Study Hours":5.4,"Attendance":70.4,"Previous Marks":77.8,"Assignments Completed":91.9,"Participation":3,"Final Marks":72.4},{"Study Hours":9.8,"Attendance":95.7,"Previous Marks":86.5,"Assignments Completed":50.1,"Participation":2,"Final Marks":75.6},{"Study Hours":7.3,"Attendance":60.9,"Previous Marks":93.9,"Assignments Completed":53.9,"Participation":2,"Final Marks":67.1},{"Study Hours":10.8,"Attendance":74.2,"Previous Marks":40.5,"Assignments Completed":49.1,"Participation":3,"Final Marks":59.2},{"Study Hours":15.4,"Attendance":81.2,"Previous Marks":48.1,"Assignments Completed":52.0,"Participation":2,"Final Marks":62.6},{"Study Hours":7.8,"Attendance":97.0,"Previous Marks":93.5,"Assignments Completed":47.2,"Participation":2,"Final Marks":75.7},{"Study Hours":3.6,"Attendance":90.1,"Previous Marks":88.6,"Assignments Completed":67.4,"Participation":3,"Final Marks":74.3},{"Study Hours":14.0,"Attendance":96.7,"Previous Marks":53.0,"Assignments Completed":53.9,"Participation":1,"Final Marks":67.1},{"Study Hours":13.8,"Attendance":69.9,"Previous Marks":91.2,"Assignments Completed":89.1,"Participation":3,"Final Marks":84.9},{"Study Hours":15.0,"Attendance":67.0,"Previous Marks":83.3,"Assignments Completed":50.9,"Participation":1,"Final Marks":73.6},{"Study Hours":15.1,"Attendance":75.7,"Previous Marks":56.8,"Assignments Completed":88.7,"Participation":1,"Final Marks":69.4}];

  const GRADE_BANDS = [
    { min: 85, letter: "A", label: "Excellent" },
    { min: 70, letter: "B", label: "Good" },
    { min: 55, letter: "C", label: "Satisfactory" },
    { min: 40, letter: "D", label: "Needs improvement" },
    { min: 0, letter: "F", label: "At serious risk" }
  ];
  const PASS_THRESHOLD = 40;
  const AT_RISK_THRESHOLD = 55;

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

  const dateEl = document.getElementById("today-date");
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString(undefined, {
      year: "numeric", month: "long", day: "numeric"
    });
  }

  function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }

  function letterFor(score) {
    for (const band of GRADE_BANDS) if (score >= band.min) return band;
    return GRADE_BANDS[GRADE_BANDS.length - 1];
  }

  // ---------- Basic matrix operations for Ordinary Least Squares ----------
  function transpose(A) {
    return A[0].map((_, j) => A.map(row => row[j]));
  }

  function multiply(A, B) {
    const result = Array.from({length: A.length}, () => Array(B[0].length).fill(0));
    for (let i = 0; i < A.length; i++) {
      for (let k = 0; k < B.length; k++) {
        for (let j = 0; j < B[0].length; j++) result[i][j] += A[i][k] * B[k][j];
      }
    }
    return result;
  }

  function inverse(A) {
    const n = A.length;
    const M = A.map((row, i) => row.slice().concat(
      Array.from({length:n}, (_, j) => i === j ? 1 : 0)
    ));

    for (let col = 0; col < n; col++) {
      let pivot = col;
      for (let row = col + 1; row < n; row++) {
        if (Math.abs(M[row][col]) > Math.abs(M[pivot][col])) pivot = row;
      }
      if (Math.abs(M[pivot][col]) < 1e-10) throw new Error("Training matrix is singular.");
      [M[col], M[pivot]] = [M[pivot], M[col]];

      const div = M[col][col];
      for (let j = 0; j < 2*n; j++) M[col][j] /= div;

      for (let row = 0; row < n; row++) {
        if (row === col) continue;
        const factor = M[row][col];
        for (let j = 0; j < 2*n; j++) M[row][j] -= factor * M[col][j];
      }
    }
    return M.map(row => row.slice(n));
  }

  function addRidge(A, lambda) {
    return A.map((row, i) => row.map((v, j) => v + (i === j ? lambda : 0)));
  }

  function featureVector(r) {
    return [1, r["Study Hours"], r.Attendance, r["Previous Marks"],
      r["Assignments Completed"], r.Participation];
  }

  // Train on 80% and evaluate on a held-out 20%.
  function trainModel(data) {
    const shuffled = [...data];
    // Deterministic shuffle makes the displayed metrics stable between refreshes.
    let seed = 2026;
    for (let i = shuffled.length - 1; i > 0; i--) {
      seed = (seed * 9301 + 49297) % 233280;
      const j = Math.floor((seed / 233280) * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const split = Math.floor(shuffled.length * 0.8);
    const trainRows = shuffled.slice(0, split);
    const testRows = shuffled.slice(split);

    const X = trainRows.map(featureVector);
    const y = trainRows.map(r => [r["Final Marks"]]);
    const Xt = transpose(X);
    const XtX = multiply(Xt, X);

    let inv;
    try {
      inv = inverse(XtX);
    } catch (_) {
      // Tiny ridge term is only a numerical safeguard for unusual datasets.
      inv = inverse(addRidge(XtX, 0.000001));
    }

    const beta = multiply(multiply(inv, Xt), y).map(v => v[0]);

    const predictRow = r => {
      const x = featureVector(r);
      return x.reduce((sum, value, i) => sum + value * beta[i], 0);
    };

    const actual = testRows.map(r => r["Final Marks"]);
    const predicted = testRows.map(predictRow);
    const mean = actual.reduce((s,v) => s + v, 0) / actual.length;
    const ssTot = actual.reduce((s,v) => s + (v - mean) ** 2, 0);
    const ssRes = actual.reduce((s,v,i) => s + (v - predicted[i]) ** 2, 0);

    return {
      beta,
      r2: ssTot ? 1 - ssRes / ssTot : 0,
      rmse: Math.sqrt(ssRes / actual.length),
      trainCount: trainRows.length,
      testCount: testRows.length,
      testPred: testRows.map((r,i) => ({ actual:r["Final Marks"], predicted:predicted[i] }))
    };
  }

  let model;
  try {
    model = trainModel(DATASET);
  } catch (err) {
    console.error("Model training failed:", err);
    model = null;
  }

  // Add ML status to the page without changing the original report layout.
  const panelHint = document.querySelector(".report-panel .panel-hint");
  if (panelHint) {
    panelHint.textContent = model
      ? `Multiple Linear Regression • trained on ${model.trainCount} students • tested on ${model.testCount} students • R² ${model.r2.toFixed(3)} • RMSE ${model.rmse.toFixed(2)}`
      : "Machine-learning model could not be trained.";
  }

  function readInputs() {
    return {
      previousGrade: parseFloat(document.getElementById("previous-grade").value),
      attendance: parseFloat(document.getElementById("attendance").value),
      studyHours: parseFloat(document.getElementById("study-hours").value),
      assignments: parseFloat(document.getElementById("assignments").value),
      participation: parseInt(document.getElementById("participation").value, 10),
      name: document.getElementById("student-name").value.trim()
    };
  }

  function validate(inputs) {
    const problems = [];
    if (!Number.isFinite(inputs.previousGrade) || inputs.previousGrade < 0 || inputs.previousGrade > 100)
      problems.push("Previous grade average must be between 0 and 100.");
    if (!Number.isFinite(inputs.attendance) || inputs.attendance < 0 || inputs.attendance > 100)
      problems.push("Attendance rate must be between 0 and 100.");
    if (!Number.isFinite(inputs.studyHours) || inputs.studyHours < 0 || inputs.studyHours > 60)
      problems.push("Weekly study hours must be between 0 and 60.");
    if (!Number.isFinite(inputs.assignments) || inputs.assignments < 0 || inputs.assignments > 100)
      problems.push("Assignment completion must be between 0 and 100.");
    return problems;
  }

  function predict(inputs) {
    if (!model) throw new Error("The ML model is not available.");
    const x = [1, inputs.studyHours, inputs.attendance, inputs.previousGrade,
      inputs.assignments, inputs.participation];
    const raw = x.reduce((sum, value, i) => sum + value * model.beta[i], 0);
    const score = clamp(raw, 0, 100);

    // Approximate feature influence from learned coefficient × input.
    const contributions = {
      previous: Math.abs(model.beta[3] * inputs.previousGrade),
      attendance: Math.abs(model.beta[2] * inputs.attendance),
      study: Math.abs(model.beta[1] * inputs.studyHours),
      assignments: Math.abs(model.beta[4] * inputs.assignments)
    };
    return { score: Math.round(score * 10) / 10, contributions };
  }

  function buildNotes(inputs) {
    const notes = [];
    if (inputs.attendance < 75) notes.push({type:"risk",text:"Attendance is below 75% and may reduce the predicted result."});
    else if (inputs.attendance >= 95) notes.push({type:"strength",text:"Attendance is excellent and supports the prediction."});
    if (inputs.studyHours < 5) notes.push({type:"risk",text:"Weekly study time is low; increasing it may improve the predicted result."});
    else if (inputs.studyHours >= 15) notes.push({type:"strength",text:"Study time is strong and supports the prediction."});
    if (inputs.assignments < 60) notes.push({type:"risk",text:"Assignment completion is below 60% and may reduce the predicted result."});
    else if (inputs.assignments >= 90) notes.push({type:"strength",text:"Assignment completion is high and supports the prediction."});
    if (inputs.previousGrade < 40) notes.push({type:"risk",text:"Previous marks are low, which can strongly affect the learned model prediction."});
    if (notes.length === 0) notes.push({type:"strength",text:"The supplied factors are in a generally healthy range."});
    return notes;
  }

  function buildComment(inputs, result) {
    const name = inputs.name || "This student";
    const first = name.split(" ")[0];
    if (result.score >= 85) return `${first} is predicted to perform at an excellent level based on the patterns learned from the student dataset.`;
    if (result.score >= 70) return `${first} is predicted to achieve a good result, with room to improve the weaker input factors.`;
    if (result.score >= 55) return `${first} is predicted to pass, but improving the weaker factors could raise the expected result.`;
    if (result.score >= 40) return `${first} is predicted to be at risk of falling behind. Focus on the weaker factors first.`;
    return `${first} is predicted to be below the passing level. Immediate improvement in the weaker factors is recommended.`;
  }

  function renderResult(inputs, result) {
    const band = letterFor(result.score);
    reportEmpty.hidden = true;
    reportFilled.hidden = false;
    scoreValue.textContent = result.score.toFixed(1);
    letterGradeEl.textContent = `${band.letter} — ${band.label}`;

    stampEl.classList.remove("at-risk", "fail");
    if (result.score < PASS_THRESHOLD) {
      stampEl.textContent = "FAIL"; stampEl.classList.add("fail");
    } else if (result.score < AT_RISK_THRESHOLD) {
      stampEl.textContent = "AT RISK"; stampEl.classList.add("at-risk");
    } else stampEl.textContent = "PASS";

    const vals = Object.values(result.contributions);
    const maxVal = Math.max(...vals, 1);
    Object.keys(bars).forEach((key) => {
      const pct = clamp((result.contributions[key] / maxVal) * 100, 0, 100);
      bars[key].fill.style.width = "0%";
      requestAnimationFrame(() => bars[key].fill.style.width = pct.toFixed(0) + "%");
      bars[key].value.textContent = Math.round(result.contributions[key]);
    });

    notesList.innerHTML = "";
    buildNotes(inputs).forEach(note => {
      const li = document.createElement("li");
      li.textContent = note.text;
      li.className = note.type;
      notesList.appendChild(li);
    });
    teacherComment.textContent = buildComment(inputs, result);
  }

  function showError(messages) {
    errorEl.textContent = messages.join(" ");
    errorEl.hidden = false;
  }
  function clearError() { errorEl.hidden = true; errorEl.textContent = ""; }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const inputs = readInputs();
    const problems = validate(inputs);
    if (problems.length) return showError(problems);
    clearError();
    try { renderResult(inputs, predict(inputs)); }
    catch (err) { showError([err.message]); }
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
