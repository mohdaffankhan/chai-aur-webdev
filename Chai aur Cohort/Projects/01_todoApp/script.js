window.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.querySelector(".taskInput input");
  const clearAll = document.querySelector(".clear-btn");
  const taskBox = document.querySelector(".taskBox");
  const allFilter = document.getElementById("all");
  const pendingFilter = document.getElementById("pending");
  const completedFilter = document.getElementById("completed");

  let Tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let displayedTasks = Tasks;

  // Save tasks to local storage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(Tasks));
  }

  // Render existing tasks from local storage on page load
  Tasks.forEach((task) => renderTask(task));

  // Add new task on Enter key press
  taskInput.addEventListener("keyup", (e) => {
    const taskText = taskInput.value.trim();
    if (e.key === "Enter" && taskText) {
      const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      Tasks.push(newTask);
      saveTasks();
      renderTask(newTask);
      taskInput.value = "";
      console.log(Tasks);
    }
  });

  // Render a single task in the UI
  function renderTask(task) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
    <label for="${task.id}">
    <input type="checkbox" id="${task.id}" ${task.completed ? "checked" : ""}>
    <p contenteditable=false>${task.text}</p>
    </label>
    <div class="settings">
        <i class="fi fi-rr-menu-dots"></i>
        <div class="dropdown-menu" style="display: none;">
        <ul>
            <li class="edit"><i class="fi fi-rr-pencil"></i>Edit</li>
            <li class="delete"><i class="fi fi-rr-trash"></i>Delete</li>
        </ul>
        </div>
    </div>
    `;
    taskBox.appendChild(li);

    // Listen for checkbox changes
    li.querySelector("input[type='checkbox']").addEventListener(
      "change",
      (e) => {
        task.completed = e.target.value; // Update the task's completed state
        saveTasks(); // Save updated tasks to localStorage
      }
    );

    const menuIcon = li.querySelector(".fi-rr-menu-dots");
    const dropdownMenu = li.querySelector(".dropdown-menu");
    // Toggle the dropdown menu when the menu icon is clicked
    menuIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("show");
    });

    // Handle dropdown menu item clicks
    const editTask = li.querySelector(".edit");
    const taskText = li.querySelector("p");
    const deleteTask = li.querySelector(".delete");

    // Handle edit task logic here
    editTask.addEventListener("click", () => {
      startEditing(taskText);
      dropdownMenu.classList.remove("show");
    });
    function startEditing(pElement) {
      const originalText = pElement.textContent;
      pElement.contentEditable = true;
      pElement.focus();
      // Handle keydown event
      pElement.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          pElement.contentEditable = false;
          const editedText = pElement.textContent.trim();
          if (editedText === "") {
            pElement.textContent = originalText;
          } else {
            task.text = editedText;
            saveTasks();
          }
        } else if (e.key === "Escape") {
          pElement.contentEditable = false;
          pElement.textContent = originalText;
        }
      });

      // Handle blur event
      pElement.addEventListener("blur", () => {
        pElement.contentEditable = false;
      });
    }

    // Handle delete task logic here
    deleteTask.addEventListener("click", () => {
      Tasks = Tasks.filter((t) => t.id !== task.id);
      saveTasks();
      li.remove();
    });
  }

  // Function to remove 'active' from all filters and set it on the clicked one
  function setActiveFilter(activeFilter) {
    document.querySelectorAll(".filters span").forEach((filter) => {
      filter.classList.remove("active"); // Remove 'active' from all
    });
    activeFilter.classList.add("active"); // Add 'active' to the selected filter
  }

  // Filter tasks
  allFilter.addEventListener("click", () => {
    taskBox.innerHTML = "";
    Tasks.forEach((task) => renderTask(task));
    displayedTasks = Tasks;
    setActiveFilter(allFilter);
  });

  pendingFilter.addEventListener("click", () => {
    const pendingTasks = Tasks.filter((task) => !task.completed);
    taskBox.innerHTML = "";
    pendingTasks.forEach((task) => renderTask(task));
    displayedTasks = pendingTasks;
    setActiveFilter(pendingFilter);
  });

  completedFilter.addEventListener("click", () => {
    const completedTasks = Tasks.filter((task) => task.completed);
    taskBox.innerHTML = "";
    completedTasks.forEach((task) => renderTask(task));
    displayedTasks = completedTasks;
    setActiveFilter(completedFilter);
  });

  // Toggle all tasks
  document.querySelector(".fi-rr-list-check").addEventListener("click", () => {
    const allCompleted = Tasks.every((task) => task.completed); // Check if all are completed
    Tasks.forEach((task) => (task.completed = !allCompleted)); // Toggle all
    saveTasks();
    taskBox.innerHTML = ""; // Clear current UI
    Tasks.forEach((task) => renderTask(task)); // Re-render with updated tasks
  });

  // Clear all displayed tasks
  clearAll.addEventListener("click", () => {
    Tasks = Tasks.filter((task) => !displayedTasks.includes(task));
    saveTasks();
    taskBox.innerHTML = "";
  });
});
