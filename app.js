// Base64 decoding function of API key
function base64Decode(inputText) {
  if (!inputText) {
    alert("Insert API key");
    return;
  }
  let encodedText = inputText;
  var chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var padding = 0;
  var decodedDataLength = (encodedText.length / 4) * 3;

  if (encodedText.charAt(encodedText.length - 1) === "=") {
    padding++;
    decodedDataLength--;
  }
  if (encodedText.charAt(encodedText.length - 2) === "=") {
    padding++;
    decodedDataLength--;
  }

  var decodedData = new Uint8Array(decodedDataLength);

  for (var i = 0, j = 0; i < encodedText.length; i += 4, j += 3) {
    var group =
      (chars.indexOf(encodedText.charAt(i)) << 18) |
      (chars.indexOf(encodedText.charAt(i + 1)) << 12) |
      (chars.indexOf(encodedText.charAt(i + 2)) << 6) |
      chars.indexOf(encodedText.charAt(i + 3));

    decodedData[j] = (group >> 16) & 255;
    decodedData[j + 1] = (group >> 8) & 255;
    decodedData[j + 2] = group & 255;
  }

  return decodedData;
}

// descript function
function decrypt(encryptedText, key) {
  var decodedData = base64Decode(encryptedText);
  var decryptedData = new Uint8Array(decodedData.length);

  for (var i = 0; i < decodedData.length; i++) {
    decryptedData[i] = decodedData[i] ^ key.charCodeAt(i % key.length);
  }

  var decoder = new TextDecoder();
  var decryptedText = decoder.decode(decryptedData);
  return decryptedText;
}

async function getFromChromeStorage(key) {
  console.log("current key: ", key);
  const request = await new Promise((ree) => {
    if (key == "prompts_table") {
      chrome.storage.local.get([key], (result) => ree(result.prompts_table));
    } else if (key == "streams_table") {
      chrome.storage.local.get([key], (result) => ree(result.streams_table));
    }
  });
  console.log("via function: ", request);
  return request;
}

const form = document.getElementById("form");
const form_stream = document.getElementById("form-stream");
const table = document.getElementById("table");
const table_stream = document.getElementById("table-stream");
const promptInput = document.getElementById("prompt");
const streamInput = document.getElementById("stream");
const descriptionInput = document.getElementById("description");
let selectedRow = null;

// for prompt
let _jsonData = "";
// for stream
let __jsonData = "";
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
          remove_key(toDel, "prompts_table");
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

// getFromChromeStorage("streams_table")
//   .then((res) => {
//     __jsonData = res;
//     if (__jsonData) {
//       try {
//         __data = JSON.parse(__jsonData) || {};
//         console.log(__data);
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     for (const key in __data) {
//       if (__data.hasOwnProperty(key)) {
//         const row = document.createElement("tr");

//         const streamCell = document.createElement("td");
//         streamCell.textContent = key;

//         const instructionCell = document.createElement("td");
//         instructionCell.textContent = __data[key];

//         const actionsCell = document.createElement("td");
//         // Create edit and delete buttons in the last cell
//         const editButton = document.createElement("button");
//         editButton.className = "btn btn-success";
//         editButton.textContent = "Edit";
//         editButton.style = "margin-left:10px; margin-right:10px";
//         editButton.addEventListener("click", function () {
//           streamInput.value = streamCell.textContent;
//           streamInput.disabled = true;
//           instructionInput.value = instructionCell.textContent;
//           selectedRow = row;
//         });

//         const deleteButton = document.createElement("button");
//         deleteButton.className = "btn btn-danger";
//         deleteButton.textContent = "Delete";
//         deleteButton.addEventListener("click", function () {
//           const toDel = row.querySelector("td").textContent;
//           remove_key(toDel, "streams_table");
//           table_stream.deleteRow(row.rowIndex);
//         });
//         actionsCell.appendChild(editButton);
//         actionsCell.appendChild(deleteButton);

//         row.appendChild(streamCell);
//         row.appendChild(instructionCell);
//         row.appendChild(actionsCell);

//         table_stream.appendChild(row);
//       }
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//   });

async function fetchDataFromAPI() {
  chrome.storage.local.set({ streams_table: {} });
  console.log("fetching data from openai assistants");
  let apiKey = await new Promise((resolve) =>
    chrome.storage.local.get(["apiKey"], (result) => resolve(result.apiKey))
  );
  apiKey = decrypt(apiKey, _md);
  fetch("https://api.openai.com/v1/assistants", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
      "OpenAI-Beta": "assistants=v1",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const __data = data.data;
      if (__data) {
        for (const item of __data) {
          const row = document.createElement("tr");

          const nameCell = document.createElement("td");
          nameCell.textContent = item.name;

          const instructionCell = document.createElement("td");
          instructionCell.textContent = item.instructions;

          const actionsCell = document.createElement("td");
          // Create edit and delete buttons in the last cell
          // The actual implementation details for editing/removing should be defined
          // For example, the remove_key and table_stream.deleteRow functions are placeholders here

          const editButton = document.createElement("button");
          editButton.className = "btn btn-success";
          editButton.textContent = "Edit";
          editButton.style = "margin-left:10px; margin-right:10px";
          // editButton.addEventListener("click", function () {
          //   promptInput.value = promptCell.textContent;
          //   promptInput.disabled = true;
          //   descriptionInput.value = descriptionCell.textContent;
          //   selectedRow = row;
          // });
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-danger";
          deleteButton.textContent = "Delete";
          // deleteButton.addEventListener("click", function () {
          //   const toDel = row.querySelector("td").textContent;
          //   remove_key(toDel, "streams_table");
          //   table.deleteRow(row.rowIndex);
          // });

          actionsCell.appendChild(editButton);
          actionsCell.appendChild(deleteButton);

          row.appendChild(nameCell);
          row.appendChild(instructionCell);
          row.appendChild(actionsCell);

          // Assuming table_stream is a reference to a <table> element on your page
          table_stream.appendChild(row);

          add_key_value(
            nameCell.textContent,
            instructionCell.textContent,
            "streams_table"
          );
        }
      }
    })
    .catch((err) => {
      console.error("Fetch Error:", err);
    });
}

fetchDataFromAPI();

// prompts table data
let _data = {};
// streams table data
let __data = {};

// Add event listener to the form submit event
form_stream.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent form submission

  const streamInput = document.getElementById("stream");
  const stream = streamInput.value;
  const instructionInput = document.getElementById("instruction");
  const instruction = instructionInput.value;

  streamInput.disabled = false;

  if (selectedRow) {
    // Update the selected row with the new values
    selectedRow.cells[0].textContent = stream;
    selectedRow.cells[1].textContent = instruction;
    selectedRow = null;
  } else {
    // Create a new row in the table
    const row = table_stream.insertRow(-1);

    // Insert cells with the stream
    const streamCell = row.insertCell(0);
    streamCell.textContent = stream;

    const instructionCell = row.insertCell(1);
    instructionCell.textContent = instruction;

    // Create edit and delete buttons in the last cell
    const editButton = document.createElement("button");
    editButton.className = "btn btn-success";
    editButton.textContent = "Edit";
    editButton.style =
      "margin-left:10px; margin-right:10px; margin-top:5px; margin-bottom:5px";
    editButton.addEventListener("click", function () {
      streamInput.value = streamCell.textContent;
      streamInput.disabled = true;
      instructionInput.value = instructionCell.textContent;
      selectedRow = row;
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      const toDel = row.querySelector("td").textContent;

      // add code here to delete chatgpt assistant by id
      remove_key(toDel, "streams_table");
      table_stream.deleteRow(row.rowIndex);
    });

    const actionsCell = row.insertCell(2);
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }

  let apiKey = await new Promise((resolve) =>
    chrome.storage.local.get(["apiKey"], (result) => resolve(result.apiKey))
  );
  apiKey = decrypt(apiKey, _md);
  // add code here to create chatgpt assistant
  const _headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${apiKey}`,
    "OpenAI-Beta": "assistants=v1",
  });

  // Create the data object
  const _data_To_Create_Assistant = {
    instructions: instruction,
    name: stream,
    tools: [{ type: "code_interpreter" }],
    model: "gpt-4",
  };

  // Make the POST request using fetch
  fetch("https://api.openai.com/v1/assistants", {
    method: "POST",
    headers: _headers,
    body: JSON.stringify(_data_To_Create_Assistant), // Convert the data object to a JSON string
  })
    .then((response) => response.json()) // Parse the JSON response
    .then((data) => {
      console.log("successed to create an assistant: ", stream);
      console.log(data); // Log the response data

      // save stream name and instruction
      add_key_value(stream, instruction, "streams_table");
    })
    .catch((error) => {
      console.error("Error:", error); // Handle any errors
    });
  // Clear the form inputs
  streamInput.value = "";
  instructionInput.value = "";
});

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
    editButton.style =
      "margin-left:10px; margin-right:10px; margin-top:5px; margin-bottom:5px";
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
      remove_key(toDel, "prompts_table");
      table.deleteRow(row.rowIndex);
    });

    const actionsCell = row.insertCell(2);
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  }
  add_key_value(prompt, description, "prompts_table");
  // Clear the form inputs
  promptInput.value = "";
  descriptionInput.value = "";
});

function add_key_value(prompt, description, table_name) {
  let jsonData = "";
  getFromChromeStorage(table_name)
    .then((res) => {
      jsonData = res;
      let data = {};
      console.log("local jsonData: ", jsonData);
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
      console.log("updated jsonData: ", updatedJsonData);
      // Save the updated JSON data to local storage
      if (table_name == "prompts_table") {
        chrome.storage.local.set({ prompts_table: updatedJsonData });
      } else if (table_name == "streams_table") {
        chrome.storage.local.set({ streams_table: updatedJsonData });
      }
    })
    .catch((err) => {
      console.log("err: ", err);
    });
}

function update_key_value(prompt, description) {
  console.log("update func called...");
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

function remove_key(prompt, table_name) {
  let jsonData = "";
  getFromChromeStorage(table_name)
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
      if (table_name == "prompts_table") {
        chrome.storage.local.set({ prompts_table: updatedJsonData });
      } else if (table_name == "streams_table") {
        chrome.storage.local.set({ streams_table: updatedJsonData });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
