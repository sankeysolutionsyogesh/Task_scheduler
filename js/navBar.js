var onPage =  "add_task";

//change side
function handleAddClick() {
    if (onPage != "add_task") {
      const addSide = document.getElementById("add_task");
  
      addSide.style.display = "";
  
      const viewTask = document.getElementById("view_task");
  
      viewTask.style.display = "none";
      onPage = "add_task";

      clearOutput()
    }
  }
  
  async function handleViewClick() {
    if (onPage !== "view_task") {
      const addSide = document.getElementById("add_task");
  
      addSide.style.display = "none";
      const viewTask = document.getElementById("view_task");
  
      viewTask.style.display = "";
      onPage = "view_task";
  
    // showNoResults is called her so that noresult or loading should be none at starting
    resetSearch()

    }
  }
  
  const addBarElement = document.querySelector(".add_bar");
  const viewBarElement = document.querySelector(".view_bar");
  addBarElement.addEventListener("click", handleAddClick);
  viewBarElement.addEventListener("click", handleViewClick);
  