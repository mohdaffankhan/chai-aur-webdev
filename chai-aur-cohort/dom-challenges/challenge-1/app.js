window.addEventListener("DOMContentLoaded", () => {
  const body = document.getElementById("body");
  const bulb = document.getElementById("bulb");
  const toggleButton = document.getElementById("toggleButton");
  const statusText = document.getElementById("status");

  let isBulbOn = false;

  function toggleBulb() {
    isBulbOn = !isBulbOn;
    body.classList.toggle("dark-mode");
    toggleButton.textContent = isBulbOn ? "Turn Off" : "Turn On";
    bulb.classList.toggle("on");
    bulb.classList.toggle("off");
    statusText.innerText = `Status: ${isBulbOn ? "On" : "Off"}`;
  }

  toggleButton.addEventListener("click", toggleBulb);
});
