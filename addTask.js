function addSubTask() {
  let isDuplicate = false;
  const Tasknamevalue = document.getElementById("task_name");
  const taskName = Tasknamevalue.value.trim();
  if (taskName === "") {
    // alert("Please enter a valid Task Name.");
    return;
  }

  const newTask = {
    taskId: TaskPlanner.length + 1,
    taskName: taskName,
    subTasks: [],
  };

  TaskPlanner.forEach((obj) => {
    if (obj.taskName == taskName) {
      isDuplicate = true;
    }
  });

  if (!isDuplicate) {
    TaskPlanner.push(newTask);
  }

  console.log(TaskPlanner);
  const addTaskButton = document.getElementById("add_subtask_button");
  addTaskButton.style.display = "none";
  const formSubTaskname = document.getElementById("form_subtaskname");
  formSubTaskname.style.display = "";
  return true;
}

function addTaskwithoutSubtask() {
  let isDuplicate = false;
  const Tasknamevalue = document.getElementById("task_name");
  const taskName = Tasknamevalue.value.trim();
  if (taskName === "") {
    // alert("Please enter a valid Task Name.");
    return;
  }

  const newTask = {
    Taskid: TaskPlanner.length + 1,
    taskName: taskName,
    subTasks: [],
  };

  TaskPlanner.forEach((obj) => {
    if (obj.taskName == taskName) {
      isDuplicate = true;
    }
  });

  if (!isDuplicate) {
    TaskPlanner.push(newTask);
  }

  console.log(TaskPlanner);

  // Clear the input field after adding the task
  alert("Added new Task");
  //   Tasknamevalue.value = "";
  clearOutput();
  handleViewClick();
}

function addNewSubTask() {
  const Tasknamevalue = document.getElementById("task_name");
  const taskName = Tasknamevalue.value.trim();
  const subTaskNameInput = document.getElementById("sub_task_name");
  const subTaskName = subTaskNameInput.value.trim();

  if (subTaskName === "") {
    return;
  }

  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const statusDropdown = document.getElementById("status");

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const status = statusDropdown.value;
  const selectedTaskIndex = TaskPlanner.length - 1;
  const newSubTask = {
    s_id: TaskPlanner[selectedTaskIndex].subTasks.length + 1,
    s_title: subTaskName,
    s_status: status,
    s_startDate: startDate,
    s_endDate: endDate,
  };

  TaskPlanner[selectedTaskIndex].subTasks.push(newSubTask);
  addRow(newSubTask);
  subTaskNameInput.value = "";
  startDateInput.value = "";
  endDateInput.value = "";
  statusDropdown.selectedIndex = 0;
}

function addRow(newSubTask) {
  const pElement = document.createElement("p");

  // Construct a human-readable sentence using HTML tags and CSS class
  const newSubTaskSentence = `Subtask with ID <span class="highlighted">${newSubTask.s_id}</span>, titled "<span class="highlighted">${newSubTask.s_title}</span>", has status "<span class="highlighted">${newSubTask.s_status}</span>", starting on <span class="highlighted">${newSubTask.s_startDate}</span>, and ending on <span class="highlighted">${newSubTask.s_endDate}</span>.`;

  // Set the innerHTML of the <p> element to the newSubTaskSentence
  pElement.innerHTML = newSubTaskSentence;

  // Get the output div
  const outputDiv = document.getElementById("output");

  // Append the <p> element to the output div
  outputDiv.appendChild(pElement);
}

function clearOutput() {
  const outputDiv = document.getElementById("output");
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.firstChild);
  }

  var TaskformData = document.getElementById("form_taskname");
  TaskformData.reset();

  var SubTaskformData = document.getElementById("form_subtaskname");
  SubTaskformData.reset();

  const addTaskButton = document.getElementById("add_subtask_button");
  addTaskButton.style.display = "";
  const formSubTaskname = document.getElementById("form_subtaskname");
  formSubTaskname.style.display = "none";
}

function prevent(event) {
  event.preventDefault();
}
