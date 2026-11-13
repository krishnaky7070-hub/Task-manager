function showTasks() {
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement("li");
    li.innerText = tasks[i].text + " (" + tasks[i].priority + ")";
    li.className = tasks[i].priority;
    taskList.appendChild(li);
  }
}