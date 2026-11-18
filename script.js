// commit 2: array and elements
var tasks = [];

var form = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var priority = document.getElementById("priority");
var taskList = document.getElementById("taskList");

// commit 3: when the form is submitted
form.addEventListener("submit", function(e) {
  e.preventDefault();

  var text = taskInput.value;

  // commit 6: do not allow empty task
  if (text == "") {
    alert("Please write a task first");
    return;
  }

  var newTask = {
    text: text,
    priority: priority.value,
    done: false
  };

  tasks.push(newTask);
  saveTasks();
  // commit 5: show tasks and clear the input box
  showTasks();
  taskInput.value = "";
});

// commit 4: show all tasks on the page
function showTasks() {
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    var li = document.createElement("li");
    li.innerText = tasks[i].text + " (" + tasks[i].priority + ")";
    li.className = tasks[i].priority;
    taskList.appendChild(li);
  }
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  var saved = localStorage.getItem("tasks");

  if (saved) {
    tasks = JSON.parse(saved);
  }
}



loadTasks();
showTasks();