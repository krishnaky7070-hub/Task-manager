// commit 2: array and elements
var tasks = [];
var currentFilter = "all";


var dueDate = document.getElementById("dueDate");
var form = document.getElementById("taskForm");
var taskInput = document.getElementById("taskInput");
var priority = document.getElementById("priority");
var taskList = document.getElementById("taskList");
var counter = document.getElementById("counter");
var clearBtn = document.getElementById("clearBtn");
var allBtn = document.getElementById("allBtn");
var pendingBtn = document.getElementById("pendingBtn");
var doneBtn = document.getElementById("doneBtn");

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
    dueDate: dueDate.value,
    createdOn: getToday(), 
    done: false
  };

  tasks.push(newTask);
  saveTasks();
  // commit 5: show tasks and clear the input box
  showTasks();
  taskInput.value = "";
  dueDate.value = ""; 
});

// commit 4: show all tasks on the page
// commit 4: show all tasks on the page
function showTasks() {
  taskList.innerHTML = "";

  for (var i = 0; i < tasks.length; i++) {
    if (currentFilter == "pending" && tasks[i].done == true) {
      continue;
    }

    if (currentFilter == "done" && tasks[i].done == false) {
      continue;
    }

    var li = document.createElement("li");
    li.className = tasks[i].priority;

    if (tasks[i].done == true) {
      li.className = li.className + " finished";
    }

    var span = document.createElement("span");
     var taskText = tasks[i].text + " (" + tasks[i].priority + ")";

    if (tasks[i].dueDate) {
      taskText = taskText + " - Due: " + tasks[i].dueDate;
    }

    span.innerText = taskText + " ";
    li.appendChild(span);

    var doneButton = document.createElement("button");
    doneButton.innerText = "Done";
    doneButton.setAttribute("onclick", "toggleDone(" + i + ")");
    li.appendChild(doneButton);

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.setAttribute("onclick", "deleteTask(" + i + ")");
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }

  updateCounter();
}

function updateCounter() {
  var pending = 0;
  
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].done == false) {
      pending++;
    }
  }
  
  counter.innerText = pending + " pending out of " + tasks.length + " tasks";
}
function toggleDone(index) {
  tasks[index].done = !tasks[index].done; 
  saveTasks();
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  showTasks();
}


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getToday() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var day = d.getDate();

  if (month < 10) {
    month = "0" + month;
  }

  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
}
function showHistory() {
  var historyList = document.getElementById("historyList");
  historyList.innerHTML = "";

  var today = getToday();
  var days = {};

  for (var i = 0; i < tasks.length; i++) {
    var date = tasks[i].createdOn;

    if (!date) {
      date = "Older tasks";
    }

    if (date == today) {
      continue;
    }

    if (days[date] == undefined) {
      days[date] = [];
    }

    days[date].push(tasks[i]);
  }

  var dates = Object.keys(days).sort().reverse();

  if (dates.length == 0) {
    historyList.innerText = "No previous tasks yet";
    return;
  }

  for (var j = 0; j < dates.length; j++) {
    var group = days[dates[j]];
    var doneCount = 0;

    for (var k = 0; k < group.length; k++) {
      if (group[k].done == true) {
        doneCount++;
      }
    }

    var heading = document.createElement("h3");
    heading.innerText = dates[j] + " (" + doneCount + " of " + group.length + " done)";
    historyList.appendChild(heading);

    for (var m = 0; m < group.length; m++) {
      var status = "Pending";

      if (group[m].done == true) {
        status = "Done";
      }

      var p = document.createElement("p");
      p.innerText = group[m].text + " (" + group[m].priority + ") - " + status;
      historyList.appendChild(p);
    }
  }
}
function loadTasks() {
  var saved = localStorage.getItem("tasks");
  
  if (saved) {
    tasks = JSON.parse(saved);
  }
}
var clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", function() {
  var sure = confirm("Delete all tasks?");

  if (sure) {
    tasks = [];
    localStorage.removeItem("tasks");
    showTasks();
  }
});

var allBtn = document.getElementById("allBtn");
var pendingBtn = document.getElementById("pendingBtn");
var doneBtn = document.getElementById("doneBtn");

allBtn.addEventListener("click", function() {
  currentFilter = "all";
  showTasks();
});

pendingBtn.addEventListener("click", function() {
  currentFilter = "pending";
  showTasks();
});

doneBtn.addEventListener("click", function() {
  currentFilter = "done";
  showTasks();
});

loadTasks();
showTasks();