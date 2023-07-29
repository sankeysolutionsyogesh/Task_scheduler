var startDateInput = document.getElementById("start_date");
var endDateInput = document.getElementById("end_date");

function enableEndDate() {
  if (startDateInput.value !== "") {
    endDateInput.min = startDateInput.value;
    endDateInput.disabled = false;
  } else {
    endDateInput.value = "";
    endDateInput.disabled = true;
  }
}

function enableStatusDropdown() {
  const statusDropdown = document.getElementById("status");
  var currentDate = moment().format("YYYY-MM-DD");
  console.log(currentDate);

  statusDropdown.disabled = false;
  console.log(endDateInput.value);

  if (endDateInput.value > currentDate) {
    statusDropdown.options[3].disabled = true;
    statusDropdown.options[1].disabled = false;

    return;
  }
  if (endDateInput.value < currentDate) {
    statusDropdown.options[1].disabled = true;
    statusDropdown.options[3].disabled = false;

    return;
    // Code to be executed if condition1 is false and condition2 is true
  }
}
