document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("calculateBMI").addEventListener("click", () => {
    const height = parseFloat(document.getElementById("height").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const result = document.getElementById("bmiResult");

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      result.innerHTML = "Please enter valid values!";
      result.style.color = "red";
      return;
    }

    const bmi = weight / (height / 100) ** 2;
    console.log(bmi);
    let message = `Your BMI is: <span style="color: #3C87FF;">${bmi}</span><br>`;

    if (bmi < 18.5) {
      message += "<span style='color: #1e88e5;'>Underweight</span>";
      result.style.backgroundColor = "#bbdefb";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      message += "<span style='color: #2e7d32;'>Normal Weight</span>";
      result.style.backgroundColor = "#a5d6a7";
    } else if (bmi >= 25 && bmi < 29.9) {
      message += "<span style='color: #ff8f00;'>Overweight</span>";
      result.style.backgroundColor = "#ffe082";
    } else {
      message += "<span style='color: #d32f2f;'>Obese</span>";
      result.style.backgroundColor = "#ffcdd2";
    }

    result.innerHTML = message;
  });
});