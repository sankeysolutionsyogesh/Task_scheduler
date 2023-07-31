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
  const task = TaskPlanner.find((task) => task.taskName === taskTaskName);
  if (task) {
    const subtask = task.subTasks.find((subtask) => subtask.s_id === DeletesubTaskID);

    if (subtask) {
      // Find the index of the subtask in the array
      const subtaskIndex = task.subTasks.indexOf(subtask);

      //Previous subtask index, remove 1
      task.subTasks.splice(subtaskIndex, 1);
    }
  }

  createAccordion(TaskPlanner);
  CancelDelete();
}
