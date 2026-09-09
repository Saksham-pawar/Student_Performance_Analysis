# Report Card — Student Performance Analysis

A single-page, front-end-only tool that takes a student's key figures and
predicts a score, letter grade, and pass/fail outcome — with a breakdown of
what drove the result. Built with plain HTML, CSS, and JavaScript: no
frameworks, no build step, no backend.

## Files

```
student-performance-analysis/
├── index.html   Page structure and form
├── style.css    Visual design (the "report card / ledger" theme)
├── script.js    Validation, prediction formula, and rendering
└── README.md    This file
```

## Running it

No installation needed. Open `index.html` in any modern browser
(double-click it, or right-click → Open With → your browser). Everything
runs client-side.

## What it predicts

You enter:

| Field                     | Range     |
|---------------------------|-----------|
| Previous grade average    | 0–100 %   |
| Attendance rate           | 0–100 %   |
| Weekly study hours        | 0–60 hrs  |
| Assignment completion     | 0–100 %   |
| Class participation       | Low / Medium / High |

The tool returns a predicted score out of 100, a letter grade (A–F), a
PASS / AT RISK / FAIL stamp, a bar breakdown of how much each factor
contributed, a list of flagged strengths/risk factors, and a short
auto-generated comment.

## How the prediction works

This is a **transparent, rule-based weighted formula**, not a trained
machine-learning model. It's meant to be easy to read, explain, and adjust
— all of the logic lives in `script.js`.

```
studyHoursScore = min(studyHours / 20, 1) × 100

score = previousGrade   × 0.40
      + attendance      × 0.20
      + studyHoursScore × 0.20
      + assignments     × 0.20
      + participationAdjustment   (−2, 0, or +3)
```

Grade bands applied to the final score:

| Score   | Letter | Label              |
|---------|--------|--------------------|
| 85–100  | A      | Excellent          |
| 70–84   | B      | Good               |
| 55–69   | C      | Satisfactory       |
| 40–54   | D      | Needs improvement  |
| 0–39    | F      | At serious risk    |

A score below 40 is treated as **FAIL**, 40–54 as **AT RISK** (a technical
pass with a thin margin), and 55+ as a clean **PASS**.

## Customizing it

Everything that drives the prediction is grouped at the top of
`script.js` under `WEIGHTS`, `STUDY_HOURS_CAP`, `PARTICIPATION_ADJUST`,
`GRADE_BANDS`, `PASS_THRESHOLD`, and `AT_RISK_THRESHOLD`. Change those
constants to recalibrate the model to a different grading scale or to
weight factors differently — no other code needs to change.

## Disclaimer

This is a demo / educational tool. The formula is a reasonable
approximation, not a validated statistical or ML model, and shouldn't be
used as the sole basis for real academic decisions.
