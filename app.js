async function getFromChromeStorage(key) {
  const request = await new Promise((ree) =>
    chrome.storage.local.get([key], (result) => ree(result.prompts_table))
  );
  console.log("via function: ", request);
  return request;
}

const form = document.getElementById("form");
const table = document.getElementById("table");
const promptInput = document.getElementById("prompt");
const descriptionInput = document.getElementById("description");
let selectedRow = null;

let _jsonData = "";
getFromChromeStorage("prompts_table")
  .then((res) => {
    _jsonData = res;
    if (_jsonData) {
      try {
        _data = JSON.parse(_jsonData) || {};
        console.log(_data);
      } catch (err) {
        console.log(err);
      }
    }

    for (const key in _data) {
      if (_data.hasOwnProperty(key)) {
        const row = document.createElement("tr");

        const promptCell = document.createElement("td");
        promptCell.textContent = key;

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = _data[key];

        const actionsCell = document.createElement("td");
        // Create edit and delete buttons in the last cell
        const editButton = document.createElement("button");
        editButton.className = "btn btn-success";
        editButton.textContent = "Edit";
        editButton.style = "margin-left:10px; margin-right:10px";
        editButton.addEventListener("click", function () {
          promptInput.value = promptCell.textContent;
          promptInput.disabled = true;
          descriptionInput.value = descriptionCell.textContent;
          selectedRow = row;
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", function () {
          const toDel = row.querySelector("td").textContent;
          remove_key(toDel);
          table.deleteRow(row.rowIndex);
        });
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(promptCell);
        row.appendChild(descriptionCell);
        row.appendChild(actionsCell);

        table.appendChild(row);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
let _data = {};
console.log("dddd", _jsonData);

// Add event listener to the form submit event
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const promptInput = document.getElementById("prompt");
  const descriptionInput = document.getElementById("description");
  const prompt = promptInput.value;
  const description = descriptionInput.value;

  promptInput.disabled = false;

  if (selectedRow) {
    // Update the selected row with the new values
    selectedRow.cells[0].textContent = prompt;
    selectedRow.cells[1].textContent = description;
    selectedRow = null;
  } else {
    // Create a new row in the table
    const row = table.insertRow(-1);

    // Insert cells with the prompt and description values
    const promptCell = row.insertCell(0);
    promptCell.textContent = prompt;

    const descriptionCell = row.insertCell(1);
    descriptionCell.textContent = description;

    // Create edit and delete buttons in the last cell
    const editButton = document.createElement("button");
    editButton.className = "btn btn-success";
    editButton.textContent = "Edit";
    editButton.style = "margin-left:10px; margin-right:10px";
    editButton.addEventListener("click", function () {
      promptInput.value = promptCell.textContent;
      promptInput.disabled = true;
      // promptInput.contentEditable = false;
      descriptionInput.value = descriptionCell.textContent;
      selectedRow = row;
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      const toDel = row.querySelector("td").textContent;
      remove_key(toDel);
      table.deleteRow(row.rowIndex);
    });

    const actionsCell = row.insertCell(2);
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }
  add_key_value(prompt, description);
  // Clear the form inputs
  promptInput.value = "";
  descriptionInput.value = "";
});

function add_key_value(prompt, description) {
  // const jsonData = localStorage.getItem("prompts_table");
  let jsonData = "";
  getFromChromeStorage("prompts_table")
    .then((res) => {
      jsonData = res;
      let data = {};
      if (jsonData) {
        // Parse the JSON data into a JavaScript object
        try {
          data = JSON.parse(jsonData) || {};
        } catch (err) {
          console.log(err);
        }
      }

      // Add a new key-value pair to the object
      data[prompt] = description;
      // Convert the updated object back to JSON format
      const updatedJsonData = JSON.stringify(data);
      // Save the updated JSON data to local storage
      chrome.storage.local.set({ prompts_table: updatedJsonData });
      // localStorage.setItem("prompts_table", updatedJsonData);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
}

function update_key_value(prompt, description) {
  // const jsonData = localStorage.getItem("prompts_table");
  let jsonData = "";
  getFromChromeStorage("prompts_table")
    .then((res) => {
      jsonData = res;
      let data = {};
      if (jsonData) {
        // Parse the JSON data into a JavaScript object
        try {
          data = JSON.parse(jsonData) || {};
        } catch (err) {
          console.log(err);
        }
      }
      delete data[prompt];
      data[prompt] = description;
      const updatedJsonData = JSON.stringify(data);
      chrome.storage.local.set({ prompts_table: updatedJsonData });
    })
    .catch((err) => {
      console.log(err);
    });
}

function remove_key(prompt) {
  let jsonData = "";
  getFromChromeStorage("prompts_table")
    .then((res) => {
      jsonData = res;
      let data = {};
      if (jsonData) {
        // Parse the JSON data into a JavaScript object
        try {
          data = JSON.parse(jsonData) || {};
        } catch (err) {
          console.log(err);
        }
      }
      delete data[prompt];

      const updatedJsonData = JSON.stringify(data);
      chrome.storage.local.set({ prompts_table: updatedJsonData });
    })
    .catch((err) => {
      console.log(err);
    });
}
