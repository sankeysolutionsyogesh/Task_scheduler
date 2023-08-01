const accordionContainer = document.getElementById("accordion-container");
function removeAccordion() {
  return new Promise((resolve) => {
    while (accordionContainer.firstChild) {
      accordionContainer.removeChild(accordionContainer.firstChild);
    }
    resolve();
  });
}

async function createAccordion(Result) {
  //Remove the items in accordion so it should be repeated.
  await removeAccordion();
  Result.forEach((task) => {
    const accordionItem = document.createElement("div");
    accordionItem.className = "accordion-item";

    //accordion header part
    const accordionItemHeader = document.createElement("div");
    accordionItemHeader.className = "accordion-item-header";

    // Task Name
    const taskNameElement = document.createElement("span");
    taskNameElement.innerText = `${task.taskId}. ${task.taskName}`;

    // Task Count
    const taskCountElement = document.createElement("p");
    taskCountElement.className = "circle";
    taskCountElement.innerText = task.subTasks.length;

    // add Button
    const addButton = document.createElement("button");
    addButton.innerHTML = '<i class="fas fa-plus"></i>';
    addButton.className = "add-button";
    addButton.addEventListener("click", () => {
      AddModal(task, task.taskName);
    });

    // Append taskname and add Button in header
    // accordionItemHeader.appendChild(taskNameElement);

    const taskHeaderWrapper = document.createElement("div");
    taskHeaderWrapper.className = "task-header-wrapper";
    taskHeaderWrapper.appendChild(taskNameElement);
    taskHeaderWrapper.appendChild(taskCountElement);



    accordionItemHeader.appendChild(taskHeaderWrapper);
    accordionItemHeader.appendChild(addButton);

    //accordion body part
    const accordionItemContent = document.createElement("div");
    accordionItemContent.className = "accordion-item-content";

    const table = document.createElement("table");
    table.innerHTML = `
    <tr>
      <th>Title</th>
      <th>Status</th>
      <th>Start Date</th>
      <th>End Date</th>
      <th>Actions</th>
    </tr>
  `;

    task.subTasks.forEach((subTask) => {
      const row = document.createElement("tr");

      // Check the status and apply background color according to it.
      if (subTask.s_status === "Completed") {
        row.style.backgroundColor = "#00cc66";
        row.style.textDecoration = "line-through";
      } else if (subTask.s_status === "In Progress") {
        row.style.backgroundColor = "#66b2ff";
      } else if (subTask.s_status === "Due Passed") {
        row.style.backgroundColor = "#ff9933";
      } else if (subTask.s_status === "Cancelled") {
        row.style.backgroundColor = "#bfbfbf";
      }

      const formattedStartDate = moment(subTask.s_startDate).format(
        "DD/MMM/YYYY"
      );

      const formattedEndDate = moment(subTask.s_endDate).format("DD/MMM/YYYY");

      var endDatemessage = "";

      checkMessage(subTask.s_endDate)
      function checkMessage(end_date) {
        const endDate = moment(end_date, "YYYY-MM-DD");
        var currentDate = moment()

        const daysDifference = endDate.diff(currentDate, 'days');

        if (subTask.s_status != "Completed") {
          if (daysDifference > 0) {
            endDatemessage = `${daysDifference} days left`;
          } else if (daysDifference < 0) {
            endDatemessage = `${Math.abs(daysDifference)} days ago`;
          } else {
            endDatemessage = `Last day`;
          }
        }

      }

      row.innerHTML = `
      <td>${subTask.s_title}</td>
      <td>${subTask.s_status}</td>
      <td>${formattedStartDate}</td>
      <td><div class="endDateFormat"><p>${formattedEndDate}</p><p> ${endDatemessage}</p></div></td>
      <td>
          <button class="delete-button"> <i class="fas fa-trash-alt"></i> </button>
          <button class="edit-button"> <i class="fas fa-edit"></i></button>
      </td>
    `;
      // Add each row in table
      table.appendChild(row);

      // Event listener for the Edit button
      const editButton = row.querySelector(".edit-button");
      editButton.addEventListener("click", () => {
        EditModal(subTask, task.taskName);
      });

      // Event listener for the Delete button
      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", () => {
        DeleteModal(task.taskName, subTask.s_id, subTask.s_title);
      });
    });

    accordionItemContent.appendChild(table);

    accordionItem.appendChild(accordionItemHeader);
    accordionItem.appendChild(accordionItemContent);
    accordionContainer.appendChild(accordionItem);

    //When click on header, content should be toggle in active. It adds active class
    accordionItemHeader.addEventListener("click", () => {
      accordionItemContent.classList.toggle("active");
      accordionItemHeader.classList.toggle("active");
    });
  });
}
