function enableEndDate(start_date, end_date) {
  var startDateInput = document.getElementById(start_date);
  var endDateInput = document.getElementById(end_date);
  if (startDateInput.value !== "") {
    endDateInput.min = startDateInput.value;
    endDateInput.disabled = false;
  } else {
    endDateInput.value = "";
    endDateInput.disabled = true;
  }
}

function enableStatusDropdown(InputendDate, status) {
  var endDateInput = document.getElementById(InputendDate);

  const statusDropdown = document.getElementById(status);
  var currentDate = new Date(moment().format("YYYY-MM-DD"));

  //End Date is entered then remove disabled of dropdown and make value blank
  statusDropdown.disabled = false;
  statusDropdown.value = "";
  
  const endDate = new Date(endDateInput.value);

  if (endDate >= currentDate) {
    statusDropdown.options[3].disabled = true;
    statusDropdown.options[1].disabled = false;
    return;
  }

  if (endDate < currentDate) {
    statusDropdown.options[1].disabled = true;
    statusDropdown.options[3].disabled = false;
    return;
  }
}
