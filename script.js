console.log("script is working");

var task = [];
var form = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var priority = document.getElementById("priority");
var taskList = document.getElementById("taskList");
form.addEventListener("submit", function (e) {
    e.preventDefault();

    var text = taskInput.value;
    var newTask = {
        text: text,
        priority: priority.value,
        done: false
    };
    tasks.push(newTask);
    console.log(tasks);
});

function showTasks() {
    taskList.innerHTML = "";

    for (var i = 0; i < tasks.length; i++) {
        var li = document.createElement("li");
        li.innerText = tasks[i].text + " (" + tasks[i].priority + ")";
        li.className = tasks[i].priority;
        taskList.appendChild(li);
    }
}
showTasks();
taskInput.value = "";
if (text == "") {
    alert("Please write a task first");
    return;
}