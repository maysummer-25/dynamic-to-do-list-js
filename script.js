document.addEventListener('DOMContentLoaded', function () {
  
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // ✅ Load tasks from local storage and render them
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    storedTasks.forEach((task) => createTaskElement(task, false));
  }

  function createTaskElement(taskText, save = true) {
    const li = document.createElement("li");
    li.textContent = taskText;

    const button = document.createElement("button");
    button.classList.add = "remove-btn";
    button.textContent = "Remove";

    button.onclick = function () {
      taskList.removeChild(li);
      updateLocalStorage();
    };

    li.appendChild(button);
    taskList.appendChild(li);

    if (save) updateLocalStorage();
  }

  // ✅ Get all tasks from DOM and save to localStorage
  function updateLocalStorage() {
    const tasks = Array.from(taskList.children).map((item) =>
      item.firstChild.textContent.trim()
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Enter a task");
      return;
    } createTaskElement(taskText); 
    taskInput.value = "";
  }

  addButton.addEventListener("click", addTask);
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

  loadTasks();
});