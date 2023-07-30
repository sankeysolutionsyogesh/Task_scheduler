var taskTaskName = null;
var DeletesubTaskTitle = null;
var DeletesubTaskID = null;
function DeleteModal(taskName, s_id, s_title) {
  taskTaskName = taskName;
  DeletesubTaskTitle = s_title;
  DeletesubTaskID = s_id;
  document.getElementById("deleteModal").style.display = "block";

  const DeleteSubtaskID = document.getElementById("DeleteSubtaskID");
  DeleteSubtaskID.innerHTML = "Task Name - " + taskTaskName;

  const DeleteSubtaskName = document.getElementById("DeleteSubtaskName");
  DeleteSubtaskName.innerHTML = "Sub TaskName - " + DeletesubTaskTitle;
}

function CancelDelete() {
  taskTaskName = null;
  DeletesubTaskTitle = null;
  DeletesubTaskID = null;
  document.getElementById("deleteModal").style.display = "none";
}

// Function to delete a subtask
function ConfirmDelete() {
  TaskPlanner.forEach((task) => {
    if (task.taskName == taskTaskName) {
      task.subTasks = task.subTasks.filter(
        (subTask) => subTask.s_id !== DeletesubTaskID
      );
    }
  });

  createAccordion();
  CancelDelete();
}
