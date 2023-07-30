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

function enableEditStatusDropdown(s_startDate, s_endDate) {
  const statusDropdown = document.getElementById("edit_status");
  var currentDate = moment().format("YYYY-MM-DD");

  console.log(s_endDate);
  console.log(currentDate);

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

  if (subTaskTitle.trim() === "" || startDate.trim() === "" || endDate.trim() === "" || status.trim() === "") {
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

function editSubtask(taskId, subtaskId, updatedSubtask) {
  console.log(taskId, subtaskId, updatedSubtask);
  const taskIndex = TaskPlanner.findIndex((task) => task.taskName === taskId);
  if (taskIndex !== -1) {
    const subtaskIndex = TaskPlanner[taskIndex].subTasks.findIndex(
      (subtask) => subtask.s_id === subtaskId
    );
    if (subtaskIndex !== -1) {
      TaskPlanner[taskIndex].subTasks.splice(subtaskIndex, 1, {
        ...TaskPlanner[taskIndex].subTasks[subtaskIndex],
        ...updatedSubtask,
      });
    }
  }
}
function checkEditendDate(editEndDate) {
  var startDateInput = document.getElementById("edit_start_date").value;
  var endDateInput = document.getElementById("edit_end_date");
  endDateInput.min = startDateInput;
  endDateInput.value = editEndDate;
}
