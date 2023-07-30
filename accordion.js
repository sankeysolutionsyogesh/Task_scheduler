function removeAccordion() {
    const accordionContainer = document.getElementById("accordion-container");
    while (accordionContainer.firstChild) {
      accordionContainer.removeChild(accordionContainer.firstChild);
    }
  }

  function createAccordion() {
    removeAccordion();
    const accordionContainer = document.getElementById("accordion-container");

    TaskPlanner.forEach((task) => {
      const accordionItem = document.createElement("div");
      accordionItem.className = "accordion-item";

      const accordionItemHeader = document.createElement("div");
      accordionItemHeader.className = "accordion-item-header";

      // Create the task name and the "Add" button elements
      const taskNameElement = document.createElement("span");
      taskNameElement.innerText = `${task.taskId}. ${task.taskName}`;

      const addButton = document.createElement("button");
      addButton.innerHTML = '<i class="fas fa-plus"></i>'; // Add the Font Awesome icon here

      addButton.className = "add-button";

      addButton.addEventListener("click", () => {
        AddModal(task.taskId,task.taskName);
      });

      // Append the task name and "Add" button elements to the header
      accordionItemHeader.appendChild(taskNameElement);
      accordionItemHeader.appendChild(addButton);

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

        // Check the subtask status and apply appropriate styles
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

        row.innerHTML = `
      <td>${subTask.s_title}</td>
      <td>${subTask.s_status}</td>
      <td>${subTask.s_startDate}</td>
      <td>${subTask.s_endDate}</td>
      <td>
          <button class="delete-button"> <i class="fas fa-trash-alt"></i> </button>
          <button class="edit-button"> <i class="fas fa-edit"></i></button>
      </td>
    `;
        table.appendChild(row);

        // Event listener for the Edit button
        const editButton = row.querySelector(".edit-button");
        editButton.addEventListener("click", () => {
          // Handle edit functionality here
         
          EditModal(subTask,task.taskName);
        });

        // Event listener for the Delete button
        const deleteButton = row.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
          // Handle delete functionality here
          
          DeleteModal(task.taskName, subTask.s_id, subTask.s_title);
        });
      });

      accordionItemContent.appendChild(table);

      accordionItem.appendChild(accordionItemHeader);
      accordionItem.appendChild(accordionItemContent);
      accordionContainer.appendChild(accordionItem);

      // Event listener to toggle accordion items
      accordionItemHeader.addEventListener("click", () => {
        accordionItemContent.classList.toggle("active");
        accordionItemHeader.classList.toggle("active");
      });
    });
  }