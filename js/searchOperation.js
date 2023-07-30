let delayTimer;
var searchOption = "";
const searchBySelect = document.getElementById("search_by");
const searchBox = document.getElementById("search_box");
const searchByDate = document.getElementById("search_by_Date");

//Divs
const searchDate = document.getElementById("search_date");
const searchTextbox = document.getElementById("search_textbox");

searchBySelect.addEventListener("change", function (event) {
  const selectedValue = event.target.value;
  console.log("Selected Value:", selectedValue);
  searchOption = selectedValue;
  if (selectedValue != "") {
    if (selectedValue === "Start_Date" || selectedValue === "End_Date") {
      searchDate.style.display = "";
      searchTextbox.style.display = "none";
      searchByDate.value = null;
    } else {
      searchDate.style.display = "none";
      searchTextbox.style.display = "";

      searchBox.disabled = false;
      searchBox.placeholder = "Search for " + selectedValue;
      searchBox.value = "";
    }
  } else {
    resetSearch();
  }
});

searchByDate.addEventListener("change", function (event) {
  showNoResults(false);
  const dateis = event.target.value;
  console.log("asdlkfmnds", dateis);
  const Results = searchFunction(searchOption, dateis);
  if (Results.length > 0) {
    const Loading = document.getElementById("Loading");
    Loading.style.display = "none";
    createAccordion(Results);
  } else {
    showNoResults(true);
  }
});

searchBox.addEventListener("keyup", function (event) {
  showNoResults(false);
  clearTimeout(delayTimer);
  const inputValue = event.target.value.trim();

  delayTimer = setTimeout(function () {
    if (inputValue.length == 0) {
      const Loading = document.getElementById("Loading");
      Loading.style.display = "none";
      createAccordion(TaskPlanner);
    } else {
      const Results = searchFunction(searchOption, inputValue);
      if (Results.length > 0) {
        const Loading = document.getElementById("Loading");
        Loading.style.display = "none";
        createAccordion(Results);
      } else {
        showNoResults(true);
      }
    }
  }, 1000);
});

function showNoResults(data) {
  removeAccordion();
  const NoResultView = document.getElementById("NoResultView");
  const Loading = document.getElementById("Loading");

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

function searchFunction(options, searchTerm) {
  //   console.log("date", searchOption, inputData);
  // Convert the searchTerm to lowercase for case-insensitive search
  searchTerm = searchTerm.toLowerCase();

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
          console.log("Subtask Found:", subTask.s_title);
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
    } else if (options === "Start_Date") {
      var Subtask = [];
      task.subTasks.forEach((subTask) => {
        if (subTask.s_startDate === searchTerm) {
          console.log("Subtask Found:", subTask.s_title);
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
          console.log("Subtask Found:", subTask.s_title);
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
  });

  return results;
}

function resetSearch() {
  document.getElementById("search_by").selectedIndex = 0;
  searchBox.value = "";
  searchOption = "";
  searchDate.style.display = "none";
  searchTextbox.style.display = "";
  searchBox.disabled = true;
  searchBox.placeholder = "Select options in dropdown to search";
  showNoResults("both");
  createAccordion(TaskPlanner);
}
