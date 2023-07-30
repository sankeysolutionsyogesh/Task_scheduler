
var AddNewSingleSubTask = null;
var AddNewSingleSubTaskName = null;

function AddModal(taskId, TaskName) {
  console.log("ID", taskId);
  AddNewSingleSubTask = taskId.taskId;
  AddNewSingleSubTaskName = TaskName;

  const addNewTaskName = document.getElementById("addNewTaskName");
  addNewTaskName.innerHTML = "Task Name - " + AddNewSingleSubTaskName;

  const addNewSubTaskID = document.getElementById("addNewSubTaskID");
  addNewSubTaskID.innerHTML = "SubTask Number  - " + (taskId.subTasks.length + 1);

  document.getElementById("addTaskModal").style.display = "block";
}

function CancelAddModal() {
  AddNewSingleSubTask = null;
  AddNewSingleSubTaskName = null;
  document.getElementById("addTaskModal").style.display = "none";
}

function addNewSingleSubTask() {
  const subTaskName = document.getElementById("new_sub_task_name").value;
  const startDate = document.getElementById("new_start_date").value;
  const endDate = document.getElementById("new_end_date").value;
  const status = document.getElementById("new_status").value;

  if (subTaskName.trim() === "" || startDate.trim() === "" || endDate.trim() === "" || status.trim() === "") {
    return false;
  }
  

  // Create the new subtask object
  const newSubTask = {
    s_title: subTaskName,
    s_status: status,
    s_startDate: startDate,
    s_endDate: endDate,
  };

  const selectedTask = TaskPlanner.find(
    (task) => task.taskId === AddNewSingleSubTask
  );

  if (selectedTask) {
    // If the task exists, add the new subtask to its subTasks array
    newSubTask.s_id = selectedTask.subTasks.length;
    selectedTask.subTasks.push(newSubTask);
    alert(`Added new subTask in ${AddNewSingleSubTaskName}`)
  } else {
    alert(`Task with ID ${AddNewSingleSubTask} not found.`)
  }
  createAccordion(TaskPlanner) 
  CancelAddModal() 
//   console.log(TaskPlanner)
}
