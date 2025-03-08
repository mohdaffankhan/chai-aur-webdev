let KanbanBoard = JSON.parse(localStorage.getItem("kanbanBoard")) || [
  { title: "Todo", tasks: [] },
  { title: "In Progress", tasks: [] },
  { title: "Done", tasks: [] },
];

window.addEventListener("DOMContentLoaded", () => {
  render();

  // Set the min attribute to today
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dueDate").setAttribute("min", today);

  // Show "Add Board" modal
  document.querySelector(".addBoard").addEventListener("click", () => {
    document.getElementById("boardModal").style.display = "block";
  });

  // Hide "Add Board" modal
  document.querySelector("#boardModal .close").addEventListener("click", () => {
    document.getElementById("boardModal").style.display = "none";
  });

  // Add a new board
  document
    .querySelector("#boardModal button")
    .addEventListener("click", addBoard);

  // Hide "Add Task" modal
  document.querySelector("#taskModal .close").addEventListener("click", () => {
    document.getElementById("taskModal").style.display = "none";
  });

  // Submit a new task
  document
    .querySelector("#taskModal button")
    .addEventListener("click", submitTask);

  // Hide Task Details modal
  function closeTaskDetailsModal() {
    document.getElementById("taskDetailsModal").style.display = "none";
  }

  // Event: Close Task Details modal
  document
    .getElementById("closeDetailsModal")
    .addEventListener("click", closeTaskDetailsModal);

  // Handle drop on delete element
  document.querySelector(".deleteElement").addEventListener("drop", (e) => {
    e.preventDefault();
    deleteDrop(e);
  });
});

// Update the Render Function to Add Click Event to Each Task
function render() {
  const container = document.getElementById("container");
  container.innerHTML = "";

  KanbanBoard.forEach((board, boardIndex) => {
    const boardElement = document.createElement("div");
    boardElement.className = "board";
    boardElement.dataset.boardId = boardIndex;

    boardElement.innerHTML = `
      <h2>${board.title}</h2>
      <div class="boardButtons">
        <button class="addTask">Add Task</button>
        <button class="deleteBoard">Delete Board</button>
      </div>
      <div class="tasks" ondragover="event.preventDefault()"></div>
    `;

    boardElement
      .querySelector(".addTask")
      .addEventListener("click", () => openTaskModal(boardIndex));
    boardElement
      .querySelector(".deleteBoard")
      .addEventListener("click", () => deleteBoard(boardIndex));

    const taskContainer = boardElement.querySelector(".tasks");
    taskContainer.addEventListener("drop", (e) => handleDrop(e, boardIndex));

    board.tasks.forEach((task, taskIndex) => {
      const taskElement = document.createElement("div");
      taskElement.className = "task";
      taskElement.draggable = true;
      taskElement.dataset.taskId = taskIndex;

      let bgcolor = "#fff";
      if (task.difficulty === "easy") bgcolor = "#c2fbd7";
      else if (task.difficulty === "medium") bgcolor = "#f8ee7c";
      else if (task.difficulty === "hard") bgcolor = "#ff6161";

      const truncateText = (text, length) => {
        return text.length > length ? text.slice(0, length) + "..." : text;
      };

      // Dynamically insert task content
      taskElement.innerHTML = `
        <div class="taskContent">
          <h4>${task.title}</h4>
          <p>${truncateText(task.desc, 20)}</p>
          <div class="taskTitle" style="font-size:small; display: flex; justify-content: space-between; align-items: center;">
            <span class="difficulty" style="font-size:x-small; background-color: ${bgcolor};">${
        task.difficulty
      }</span>
            <span class="stats">${task.listedDate}</span>
          </div>
        </div>
      `;

      taskElement.addEventListener("dragstart", (e) =>
        handleDragStart(e, boardIndex, taskIndex)
      );
      taskElement.addEventListener("click", () => openTaskDetailsModal(task));

      taskContainer.appendChild(taskElement);
    });

    container.appendChild(boardElement);
    saveToLocalStorage();
  });
}

// Save to Local Storage
function saveToLocalStorage() {
  localStorage.setItem("kanbanBoard", JSON.stringify(KanbanBoard));
}

// Open Task Modal
function openTaskModal(boardIndex) {
  document.getElementById("taskModal").style.display = "block";
  document.getElementById("taskModal").dataset.boardId = boardIndex;
  document.getElementById("taskTitle").focus(); // Focus here
}

// Open Task Details Modal
function openTaskDetailsModal(task) {
  document.getElementById("detailTitle").textContent = task.title;
  document.getElementById("detailDesc").textContent = task.desc;
  document.getElementById("detailAuthor").textContent = task.author;
  document.getElementById("detailEmail").textContent = task.email;
  document.getElementById("detailDate").textContent = task.listedDate;
  document.getElementById("detailCompleteDate").textContent =
    task.completeByDate;

  document.getElementById("taskDetailsModal").style.display = "block";
}

// Submit Task
function submitTask() {
  const boardIndex = Number(
    document.getElementById("taskModal").dataset.boardId
  );
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const difficulty = document.getElementById("difficulty").value;
  const author = document.getElementById("author").value;
  const email = document.getElementById("email").value;
  const listedDate = new Date().toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
  const completeByDate = document.getElementById("dueDate").value;

  if (!title || !desc || !author || !email)
    return alert("Please fill in all fields");

  KanbanBoard[boardIndex].tasks.push({
    title,
    desc,
    difficulty,
    author,
    email,
    listedDate,
    completeByDate,
  });
  document.getElementById("taskModal").style.display = "none";
  clearTaskForm();
  render();
}

// Add Board
function addBoard() {
  const boardTitle = document.getElementById("boardTitle").value;
  if (!boardTitle) return alert("Please provide a board title");

  KanbanBoard.push({ title: boardTitle, tasks: [] });
  document.getElementById("boardModal").style.display = "none";
  clearBoardForm();
  render();
}

// Delete Board
function deleteBoard(boardIndex) {
  if (KanbanBoard.length <= 1) return alert("At least one board is required!");
  KanbanBoard.splice(boardIndex, 1);
  render();
}

// Drag & Drop Handlers
function handleDragStart(event, sourceBoardIndex, taskIndex) {
  event.dataTransfer.setData(
    "text/plain",
    JSON.stringify({ sourceBoardIndex, taskIndex })
  );
}

function handleDrop(event, targetBoardIndex) {
  const { sourceBoardIndex, taskIndex } = JSON.parse(
    event.dataTransfer.getData("text/plain")
  );
  if (sourceBoardIndex === targetBoardIndex) return;

  const task = KanbanBoard[sourceBoardIndex].tasks.splice(taskIndex, 1)[0];
  KanbanBoard[targetBoardIndex].tasks.push(task);
  render();
}

function deleteDrop(event) {
  const { sourceBoardIndex, taskIndex } = JSON.parse(
    event.dataTransfer.getData("text/plain")
  );

  KanbanBoard[sourceBoardIndex].tasks.splice(taskIndex, 1);

  render();
}

// Helper Functions
function clearTaskForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
  document.getElementById("difficulty").value = "easy";
  document.getElementById("author").value = "";
  document.getElementById("email").value = "";
  document.getElementById("dueDate").value = "";
}

function clearBoardForm() {
  document.getElementById("boardTitle").value = "";
}
