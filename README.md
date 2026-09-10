# Student Performance Analysis — Machine Learning

This version converts the original rule-based student performance estimator into a genuine **Machine Learning** project.

## Algorithm
**Multiple Linear Regression** using Ordinary Least Squares (OLS).

### Features
- Study Hours
- Attendance
- Previous Marks
- Assignments Completed
- Class Participation

### Target
- Final Marks

## How the ML model works

The included student dataset contains previous student records. The program:

1. Loads the training dataset embedded in `script.js`.
2. Randomly shuffles it using a deterministic seed.
3. Splits it into **80% training** and **20% testing** data.
4. Learns regression coefficients from the training data using:

`β = (XᵀX)⁻¹Xᵀy`

5. Evaluates the learned model on unseen test records using:
   - **R² (R-squared)**
   - **RMSE (Root Mean Squared Error)**
6. Uses the learned coefficients to predict Final Marks for a new student.

This is different from a rule-based calculator because the weights are **learned from data** rather than manually assigned in the code.

## Run

No Python, Flask, Node.js, or server is required.

Open `index.html` in a browser.

## Files

- `index.html` — website structure
- `style.css` — styling
- `script.js` — ML training, evaluation, and prediction
- `student_data.csv` — dataset used by the project

## Viva explanation

> "This project uses supervised machine learning. Multiple Linear Regression learns the relationship between study hours, attendance, previous marks, assignments, and participation and the final marks from historical student data. The dataset is split into 80% training and 20% testing data. The trained model is evaluated using R² and RMSE, and then the learned coefficients are used to predict the final marks of a new student."

## Important

The dataset included with this project is a small demonstration dataset. For a stronger academic project, it can be replaced with a larger real student-performance dataset, while keeping the same columns.
