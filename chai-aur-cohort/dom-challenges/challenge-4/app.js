window.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addButton = document.getElementById("addButton");
  const taskList = document.getElementById("taskList");
  const totalTasks = document.getElementById("totalTasks");
  const completedTasks = document.getElementById("completedTasks");

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addTask();
  });
  taskList.addEventListener("click", deleteTask);
  taskList.addEventListener("change", toggleComplete);

  // Update task stats
  function updateStats() {
    const tasks = taskList.querySelectorAll("li:not(.empty-list)");
    const completed = taskList.querySelectorAll(
      "input[type='checkbox']:checked"
    );

    totalTasks.textContent = `Total tasks: ${tasks.length}`;
    completedTasks.textContent = `Completed: ${completed.length}`;

    // Show 'No tasks' message if list is empty
    const emptyMessage = document.querySelector(".empty-list");
    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
  }

  // Add a new task
  function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");
    taskItem.innerHTML = `
    <input type="checkbox" class="complete-checkbox" />
    <span class="task-text">${taskText}</span>
    <button class="delete-button">Delete</button>
  `;

    taskList.appendChild(taskItem);

    taskInput.value = "";
    taskInput.focus();

    updateStats();
  }

  // Delete task
  function deleteTask(e) {
    if (e.target.classList.contains("delete-button")) {
      e.target.parentElement.remove();
      updateStats();
    }
  }

  // Mark task as completed or incomplete
  function toggleComplete(e) {
    if (e.target.classList.contains("complete-checkbox")) {
      const taskItem = e.target.parentElement;
      if (e.target.checked) {
        taskItem.classList.add("completed");
      } else {
        taskItem.classList.remove("completed");
      }
      updateStats();
    }
  }

  // Initial stats update
  updateStats();
});
