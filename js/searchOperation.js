let delayTimer;
var searchOption = "";
const searchBySelect = document.getElementById("search_by");
const searchBox = document.getElementById("search_box");
const searchByEndDate = document.getElementById("search_by_enddate");
const searchByStartDate = document.getElementById("search_by_startdate");

//Divs
const date_search_options = document.getElementById("date_search_options");
const status_search_options = document.getElementById("status_search_options");
const searchTextbox = document.getElementById("search_textbox");

searchBySelect.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  console.log("Selected Value:", selectedValue);
  searchOption = selectedValue;
  if (selectedValue != "") {
    if (selectedValue === "Duration") {
      date_search_options.style.display = "flex";
      status_search_options.style.display = "none"
      searchTextbox.style.display = "none";
      searchByStartDate.value = null;
      searchByEndDate.value = null;

    } else if (selectedValue === "Status"){
      date_search_options.style.display = "none";
      status_search_options.style.display = ""
      searchTextbox.style.display = "none";
    } else {
      date_search_options.style.display = "none";
      // searchDate.style.display = "none";
      searchTextbox.style.display = "";
      status_search_options.style.display = "none"
      searchBox.disabled = false;
      searchBox.placeholder = "Search for " + selectedValue;
      searchBox.value = "";
    }
  } else {
    resetSearch();
  }
});

searchByStartDate.addEventListener("change", function (event) {

  showNoResults(false);

  const startDate = event.target.value;

  const endDate = searchByEndDate.value
  console.log("Check strta", endDate.length)


  var Results = []
  if (endDate.length > 0) {
    Results = searchFunction(searchOption, `${startDate} to ${endDate}`)

  } else {
    Results = searchFunction("Start_Date", startDate)
  }

  if (Results.length > 0) {
    showNoResults("both");
    createAccordion(Results);
  } else {
    showNoResults(true);
  }

});

searchByEndDate.addEventListener("change", function (event) {
  showNoResults(false);
  const startDate = searchByStartDate.value
  console.log("Check strta", startDate.length)
  const endDate = event.target.value;

  var Results = []
  if (startDate.length > 0) {
   
    Results = searchFunction(searchOption, `${startDate} to ${endDate}`)

  } else {
    Results = searchFunction("End_Date", endDate)
  }

  if (Results.length > 0) {
    showNoResults("both");
    createAccordion(Results);
  } else {
    showNoResults(true);
  }
});

const checkedValues = [];

function handleCheckboxChange(checkbox) {
  const value = checkbox.value;

  if (checkbox.checked) {
    // Add the value to the checkedValues array if checked
    if (!checkedValues.includes(value)) {
      checkedValues.push(value);
    }
  } else {
    // Remove the value from the checkedValues array if unchecked
    const index = checkedValues.indexOf(value);
    if (index !== -1) {
      checkedValues.splice(index, 1);
    }
  }

  const Results = searchFunction(searchOption,"" ,checkedValues);
  if (Results.length > 0) {
    showNoResults("both");
    createAccordion(Results);
  } else {
    showNoResults(true);
  }
  // Display the current checkedValues array
  // console.log("Checked values:", checkedValues);
}

searchBox.addEventListener("keyup", function (event) {
  showNoResults(false);
  clearTimeout(delayTimer);
  const inputValue = event.target.value.trim();

  delayTimer = setTimeout(function () {
    if (inputValue.length == 0) {
      showNoResults("both");
      createAccordion(TaskPlanner);
    } else {
      const Results = searchFunction(searchOption, inputValue);
      if (Results.length > 0) {
        showNoResults("both");
        createAccordion(Results);
      } else {
        showNoResults(true);
      }
    }
  }, 1000);
});

function showNoResults(data) {
  removeAccordion();
  const NoResultView = document.getElementById("no_result_found");
  const Loading = document.getElementById("loading");

  if (data === "both") {
    Loading.style.display = "none";
    NoResultView.style.display = "none";
  } else {
    if (data) {
      NoResultView.style.display = "";
      Loading.style.display = "none";
    } else {
      NoResultView.style.display = "none";
      Loading.style.display = "";
    }
  }
}

function searchFunction(options, searchTerm, statusArray=[]) {
  // Convert the searchTerm to lowercase for case-insensitive search
  searchTerm = searchTerm.toLowerCase();

  const lowerCaseStatusArray = statusArray.map((status) => status.toLowerCase());

  // Create an array to store the matched results
  const results = [];

  TaskPlanner.forEach((task) => {
    if (options === "Task_Name") {
      if (task.taskName.toLowerCase().includes(searchTerm)) {
        results.push(task);
      }
    } else if (options === "SubTask_Name") {
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (subTask.s_title.toLowerCase().includes(searchTerm)) {
          Subtask.push(subTask);
        }
      });
      if (Subtask.length != 0) {
        const newTask = {
          ...task,
          subTasks: Subtask,
        };
        results.push(newTask);
      }
    } else if (options === "Start_Date") {
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (subTask.s_startDate === searchTerm) {
          // Create a new task object with the matching subtask
          Subtask.push(subTask);
        }
      });
      if (Subtask.length != 0) {
        const newTask = {
          ...task,
          subTasks: Subtask,
        };
        results.push(newTask);
      }
    } else if (options === "End_Date") {
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (subTask.s_endDate === searchTerm) {
          // Create a new task object with the matching subtask
          Subtask.push(subTask);
        }
      });
      if (Subtask.length != 0) {
        const newTask = {
          ...task,
          subTasks: Subtask,
        };
        results.push(newTask);
      }
    }
    else if (options === "Duration") {
      const [startDate, endDate] = searchTerm.split(" to ");
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (subTask.s_startDate >= startDate && subTask.s_endDate <= endDate) {
          Subtask.push(subTask);
        }
      });
     
      if (Subtask.length != 0) {
        const newTask = {
          ...task,
          subTasks: Subtask,
        };
        results.push(newTask);
      }
    }  else if (options === "Status") {
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (lowerCaseStatusArray.includes(subTask.s_status.toLowerCase())) {
          Subtask.push(subTask);
        }
      });
      console.log("Subtask", Subtask)
      if (Subtask.length != 0) {
        const newTask = {
          ...task,
          subTasks: Subtask,
        };
        results.push(newTask);
      }
    }
  });

  return results;
}

function resetSearch() {
  document.getElementById("search_by").selectedIndex = 0;
  searchBox.value = "";
  searchOption = "";
  date_search_options.style.display = "none";
  status_search_options.style.display = "none";
  searchTextbox.style.display = "";
  searchBox.disabled = true;
  searchBox.placeholder = "Select options in dropdown to search";
  showNoResults("both");
  resetCheckboxes()
  createAccordion(TaskPlanner);
}

function resetCheckboxes() {
  const checkboxes = document.querySelectorAll('.dropdown-item input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}
