//Define UI variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//Load all event listerners
loadEventListeners();

//Load All event listeners
function loadEventListeners() {
  //DOM Load event
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter task event
  filter.addEventListener("keyup", filterTasks);
}

//Get Task from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //Loop through the task array (same as add task - below)
  tasks.forEach(function(task) {
    //Create li element
    const li = document.createElement("li");
    //Add class
    li.className = "collection-item"; //in materiaize to make the ul to look good, ul needs a clas of collection and li needs calss of collection item
    //Create text node and append to li
    li.appendChild(document.createTextNode(task)); // which ever task is passed into the function
    //Create new link element
    const link = document.createElement("a");
    //Add Class to link
    link.className = "delete-item secondary-content"; //to get something to the right of an element it need this "secondary-content" class (materialize)
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></li>';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  });
}
//Add Task
function addTask(e) {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  //Create li element
  const li = document.createElement("li");
  //Add class
  li.className = "collection-item"; //in materiaize to make the ul to look good, ul needs a clas of collection and li needs calss of collection item
  //Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value)); // whatever is passed into the input to be the text node
  //Create new link element
  const link = document.createElement("a");
  //Add Class to link
  link.className = "delete-item secondary-content"; //to get something to the right of an element it need this "secondary-content" class (materialize)
  //Add icon html
  link.innerHTML = '<i class="fa fa-remove"></li>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //Store in LS (local Storage)
  storeTaskInLocalStorage(taskInput.value);

  //Clear the input
  taskInput.value = " ";

  e.preventDefault();
}

//Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove Task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//Remove from Local Storage function
function removeTaskFromLocalStorage(taskItem) {
  //Check LS to see if there is anything in it (copied from Store Task)
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //Loop through tasks
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear Task
function clearTasks() {
  // taskList.innerHTML = "";

  //Faster (performance wise)
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //https://jsperf.com/innerhtml-vs-removechild (is an example of difference between innerHTML and remove firstChild approach)

  // call Clear from Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(
    //querySelectorAll returns a Node List
    //if we used getElementByClass would return an HTML collection that would need t be converted to an array to be able to loop through
    function(task) {
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1) {
        task.style.display = "block";
      } else {
        task.style.display = "none";
      }
    }
  );
}
