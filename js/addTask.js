var Temp_TaskPlanner = [];

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
      alert("The task has been already created");
    }
  });

  if (!isDuplicate) {
    Temp_TaskPlanner.push(newTask);
    const addTaskButton = document.getElementById("add_subtask_button");
    addTaskButton.style.display = "none";
    const formSubTaskname = document.getElementById("form_subtaskname");
    formSubTaskname.style.display = "";
    return true;
  }

  return false;
}

function addTaskwithoutSubtask() {
  let isDuplicate = false;
  const Tasknamevalue = document.getElementById("task_name");
  const taskName = Tasknamevalue.value.trim();
  if (taskName === "") {
    return false;
  }

  const newTask = {
    taskId: TaskPlanner.length + 1,
    taskName: taskName,
    subTasks: [],
  };

  TaskPlanner.forEach((obj) => {
    if (obj.taskName == taskName) {
      isDuplicate = true;
      alert("The task has been already created");
    }
  });

  if (!isDuplicate) {
    if (Temp_TaskPlanner.length != 0) {
      Temp_TaskPlanner.forEach((obj) => TaskPlanner.push(obj));
    } else {
      TaskPlanner.push(newTask);
    }
    alert("Added new Task");
    clearOutput();
    handleViewClick();
  }

  return false;
}

function addNewSubTask() {
  const subTaskNameInput = document.getElementById("sub_task_name");
  const subTaskName = subTaskNameInput.value.trim();

  const startDateInput = document.getElementById("start_date");
  const endDateInput = document.getElementById("end_date");
  const statusDropdown = document.getElementById("status");

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const status = statusDropdown.value;

  if (
    subTaskName === "" ||
    startDate === "" ||
    endDate === "" ||
    status === ""
  ) {
    return;
  }

  const newSubTask = {
    s_id: Temp_TaskPlanner[0].subTasks.length + 1,
    s_title: subTaskName,
    s_status: status,
    s_startDate: startDate,
    s_endDate: endDate,
  };

  Temp_TaskPlanner[0].subTasks.push(newSubTask);
  addRow(newSubTask);
  
  //Reset subtask form
  var SubTaskformData = document.getElementById("form_subtaskname");
  SubTaskformData.reset();

  const end_date = document.getElementById("end_date");
  end_date.disabled = true;
  const status_dropdown = document.getElementById("status");
  status_dropdown.disabled = true;
}
//To add the previous subtask added details in sentence.
function addRow(newSubTask) {
  const pElement = document.createElement("p");
  const newSubTaskSentence = `Subtask with ID <span class="highlighted">${newSubTask.s_id}</span>, titled "<span class="highlighted">${newSubTask.s_title}</span>", has status "<span class="highlighted">${newSubTask.s_status}</span>", starting on <span class="highlighted">${newSubTask.s_startDate}</span>, and ending on <span class="highlighted">${newSubTask.s_endDate}</span>.`;
  pElement.innerHTML = newSubTaskSentence;

  const outputDiv = document.getElementById("output");
  outputDiv.appendChild(pElement);
}

//To reset all the forms and make the addView side in inital view
function clearOutput() {
  const outputDiv = document.getElementById("output");
  while (outputDiv.firstChild) {
    outputDiv.removeChild(outputDiv.firstChild);
  }

  Temp_TaskPlanner = [];
  var TaskformData = document.getElementById("form_taskname");
  TaskformData.reset();

  var SubTaskformData = document.getElementById("form_subtaskname");
  SubTaskformData.reset();

  const addTaskButton = document.getElementById("add_subtask_button");
  addTaskButton.style.display = "";
  const formSubTaskname = document.getElementById("form_subtaskname");
  formSubTaskname.style.display = "none";
}

