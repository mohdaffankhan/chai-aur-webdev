window.addEventListener("DOMContentLoaded", function () {
  const mainHeading = document.getElementById("mainHeading");
  const redButton = document.getElementById("redButton");
  const greenButton = document.getElementById("greenButton");
  const blueButton = document.getElementById("blueButton");
  const purpleButton = document.getElementById("purpleButton");
  const resetButton = document.getElementById("resetButton");

  redButton.addEventListener("click", function () {
    mainHeading.style.color = "red";
  });

  greenButton.addEventListener("click", function () {
    mainHeading.style.color = "green";
  });

  blueButton.addEventListener("click", function () {
    mainHeading.style.color = "blue";
  });

  purpleButton.addEventListener("click", function () {
    mainHeading.style.color = "purple";
  });

  resetButton.addEventListener("click", function () {
    mainHeading.style.color = "black";
  });
});
