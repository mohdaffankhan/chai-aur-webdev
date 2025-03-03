window.addEventListener("DOMContentLoaded", () => {
  const btncontainer = document.getElementById("btn-container");

  function createButton(colorId) {
    const button = document.createElement("button");
    button.classList.add("btn");
    button.innerText = colorId;
    button.style.backgroundColor = colorId;

    button.addEventListener("click", () => {
      document.body.style.backgroundColor = colorId;
      console.log(`Background changed to: ${colorId}`);
    });

    btncontainer.appendChild(button);
  }

  const button = document.getElementById("createBtn");
  button.addEventListener("click", () => {
    let colorId = document.getElementById("colorInput").value;
    const buttons = btncontainer.querySelectorAll(".btn");
    buttons.forEach((button) => {
      if (button.innerText === colorId) {
        alert("Button already exists");
        exit;
      }
    });
    createButton(colorId);
  });
});
