function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.title;

    if (task.done) li.classList.add("completed");

    // Toggle button
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.done ? "Undo" : "Done";
    toggleBtn.onclick = () => toggleTask(index);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.onclick = () => deleteTask(index);

    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const title = input.value.trim();
  if (!title) return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ title, done: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  input.value = "";
  loadTasks();
}

function toggleTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].done = !tasks[index].done;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}

window.onload = loadTasks;
