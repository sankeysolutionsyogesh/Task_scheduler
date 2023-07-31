var editTaskName = null;
var editsubTaskId = null;

function EditModal(subTask, taskName) {
  editTaskName = taskName;
  editsubTaskId = subTask.s_id;
  document.getElementById("editModal").style.display = "block";
  document.getElementById("edit_sub_taskname").value = subTask.s_title;
  document.getElementById("edit_start_date").value = subTask.s_startDate;
  document.getElementById("edit_status").value = subTask.s_status;

  checkEditendDate(subTask.s_endDate);
  enableEditStatusDropdown(subTask.s_startDate, subTask.s_endDate);
}
//Checks endDate validation from start date
function checkEditendDate(editEndDate) {
  var startDateInput = document.getElementById("edit_start_date").value;
  var endDateInput = document.getElementById("edit_end_date");
  endDateInput.min = startDateInput;
  endDateInput.value = editEndDate;
}

//Checks dropdown validation
function enableEditStatusDropdown(s_startDate, s_endDate) {
  const statusDropdown = document.getElementById("edit_status");
  var currentDate = moment().format("YYYY-MM-DD");

  if (s_endDate > currentDate) {
    statusDropdown.options[3].disabled = true;
    statusDropdown.options[1].disabled = false;
    return;
  }

  if (s_endDate <= currentDate) {
    statusDropdown.options[1].disabled = true;
    statusDropdown.options[3].disabled = false;
    return;
  }
}

function CancelEdit() {
  editTaskName = null;
  editsubTaskId = null;
  document.getElementById("editModal").style.display = "none";
}

function editSubTask() {
  const subTaskTitle = document.getElementById("edit_sub_taskname").value;
  const startDate = document.getElementById("edit_start_date").value;
  const endDate = document.getElementById("edit_end_date").value;
  const status = document.getElementById("edit_status").value;

  if (
    subTaskTitle.trim() === "" ||
    startDate.trim() === "" ||
    endDate.trim() === "" ||
    status.trim() === ""
  ) {
    return false;
  }

  const updatedSubTask = {
    s_id: editsubTaskId,
    s_title: subTaskTitle,
    s_status: status,
    s_startDate: startDate,
    s_endDate: endDate,
  };

  editSubtask(editTaskName, editsubTaskId, updatedSubTask);
  CancelEdit();
  createAccordion(TaskPlanner);
}

function editSubtask(taskName, subtaskId, updatedSubtask) {
  const task = TaskPlanner.find((task) => task.taskName === taskName);
  if (task) {
    const subtask = task.subTasks.find((subtask) => subtask.s_id === subtaskId);

    if (subtask) {
      // This is spread operator
      const updatedSubtaskObject = { ...subtask, ...updatedSubtask };

      // Find the index of the subtask in the array
      const subtaskIndex = task.subTasks.indexOf(subtask);

      //Previous subtask index, remove 1, add updated subtask
      task.subTasks.splice(subtaskIndex, 1, updatedSubtaskObject);
    }
  }
}

