let assistants = [];
// Base64 decoding function of API key
// function base64Decode(inputText) {
//   if (!inputText) {
//     alert("Please insert API key");
//     return;
//   }
//   let encodedText = inputText;
//   var chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
//   var padding = 0;
//   var decodedDataLength = (encodedText.length / 4) * 3;

//   if (encodedText.charAt(encodedText.length - 1) === "=") {
//     padding++;
//     decodedDataLength--;
//   }
//   if (encodedText.charAt(encodedText.length - 2) === "=") {
//     padding++;
//     decodedDataLength--;
//   }

//   var decodedData = new Uint8Array(decodedDataLength);

//   for (var i = 0, j = 0; i < encodedText.length; i += 4, j += 3) {
//     var group =
//       (chars.indexOf(encodedText.charAt(i)) << 18) |
//       (chars.indexOf(encodedText.charAt(i + 1)) << 12) |
//       (chars.indexOf(encodedText.charAt(i + 2)) << 6) |
//       chars.indexOf(encodedText.charAt(i + 3));

//     decodedData[j] = (group >> 16) & 255;
//     decodedData[j + 1] = (group >> 8) & 255;
//     decodedData[j + 2] = group & 255;
//   }

//   return decodedData;
// }

// descript function
// function decrypt(encryptedText, key) {
//   var decodedData = base64Decode(encryptedText);
//   var decryptedData = new Uint8Array(decodedData.length);

//   for (var i = 0; i < decodedData.length; i++) {
//     decryptedData[i] = decodedData[i] ^ key.charCodeAt(i % key.length);
//   }

//   var decoder = new TextDecoder();
//   var decryptedText = decoder.decode(decryptedData);
//   return decryptedText;
// }
function findAssistantId(asstname) {
  var asstId = "";
  if (asstname !== "SELECT_STREAM") {
    for (var asstIdx in assistants) {
      if (asstname === assistants[asstIdx]["name"]) {
        asstId = assistants[asstIdx]["id"];
      }
    }
  }
  return asstId;
}

async function getFromChromeStorage(key) {
  console.log("current key: ", key);
  const request = await new Promise((ree) => {
    if (key == "prompts_table") {
      chrome.storage.local.get([key], (result) => ree(result.prompts_table));
    } else if (key == "streams_table") {
      chrome.storage.local.get([key], (result) => ree(result.streams_table));
    } else {
      chrome.storage.local.get([key], (result) => ree(result.openai_thdid));
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

async function makeThread() {
  chrome.storage.local.set({ openai_thdid: "" });
  var thdId = "";
  thdId = String(getFromChromeStorage("openai_thdid"));
  console.log(thdId + " from local storage");
  if (!thdId.startsWith("thread_")) {
    fetch("http://127.0.0.1:5000/openai/threads/create", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data here
        thdId = data["thdid"];
        console.log("thread created. ", thdId);
        chrome.storage.local.set({ openai_thdid: thdId });
      })
      .catch((error) => {
        // Handle any errors here
        console.log(error);
      });
  }
}
makeThread();

async function fetchDataFromAPI() {
  const streamInput = document.getElementById("stream");
  const instructionInput = document.getElementById("instruction");
  chrome.storage.local.set({ streams_table: {} });
  console.log("fetching data from openai assistants");
  fetch("http://127.0.0.1:5000//openai/assistants", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const __data = data.data;
      assistants = __data;
      console.log("_____________________");
      console.log(__data);
      chrome.storage.local.set({ streams_table: assistants });
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
          editButton.addEventListener("click", function () {
            streamInput.value = nameCell.textContent;
            streamInput.disabled = true;
            instructionInput.value = instructionCell.textContent;
            selectedRow = row;
          });
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-danger";
          deleteButton.textContent = "Delete";
          deleteButton.addEventListener("click", function () {
            const toDel = row.querySelector("td").textContent;
            console.log(toDel);
            const asstId = findAssistantId(toDel);
            console.log(asstId);
            fetch("http://127.0.0.1:5000/openai/assistants/delete", {
              method: "DELETE",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                asstid: asstId,
              }),
            })
              .then((response) => response.text())
              .then((data) => {
                console.log(data);
                if (data === "deleted") {
                  console.log("DELETING TABLE");
                  table_stream.deleteRow(row.rowIndex);
                } else {
                  console.log("Not found: ", asstId);
                }
              })
              .catch((error) => {
                console.log(error);
              });
          });

          actionsCell.appendChild(editButton);
          actionsCell.appendChild(deleteButton);

          row.appendChild(nameCell);
          row.appendChild(instructionCell);
          row.appendChild(actionsCell);
          // Assuming table_stream is a reference to a <table> element on your page
          table_stream.appendChild(row);
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

// Add event listener to the (add stream)form submit event
form_stream.addEventListener("submit", async function (e) {
  e.preventDefault(); // Prevent form submission

  const streamInput = document.getElementById("stream");
  const stream = streamInput.value;
  const instructionInput = document.getElementById("instruction");
  const instruction = instructionInput.value;

  streamInput.disabled = false;

  // Create the data object
  const _data_To_Create_Assistant = {
    instruction: instruction,
    "assist-name": stream,
    "assist-type": "code_interpreter",
  };
  if (selectedRow) {
    console.log("modifying....");
    // Update the selected row with the new values
    const _data_To_Modify_Assistant = {
      asstid: findAssistantId(stream),
      instruction: instruction,
      "assist-name": stream,
      "assist-type": "code_interpreter",
    };
    fetch("http://127.0.0.1:5000/openai/assistants/modify", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(_data_To_Modify_Assistant),
    })
      .then((data) => {
        console.log(data);
        selectedRow.cells[0].textContent = stream;
        selectedRow.cells[1].textContent = instruction;
        selectedRow = null;
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  } else {
    if (findAssistantId(stream).length > 0) {
      alert("stream already exist!");

      streamInput.value = "";
      instructionInput.value = "";
      return;
    }
    // Make the POST request using fetch
    fetch("http://127.0.0.1:5000/openai/assistants/create", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(_data_To_Create_Assistant), // Convert the data object to a JSON string
    })
      // .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log("successed to create an assistant: ", stream);
        console.log(data); // Log the response data
        // if (selectedRow) {

        // } else {
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
          console.log(toDel);
          const asstId = findAssistantId(toDel);
          console.log(asstId);
          fetch("http://127.0.0.1:5000/openai/assistants/delete", {
            method: "DELETE",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              asstid: asstId,
            }),
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
              if (data === "deleted") {
                console.log("DELETING TABLE");
                table_stream.deleteRow(row.rowIndex);
              } else {
                console.log("Not found: ", asstId);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });

        const actionsCell = row.insertCell(2);
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        // }
        // save stream name and instruction
        add_key_value(stream, instruction, "streams_table");
      })
      .catch((error) => {
        console.error("Error:", error); // Handle any errors
      });
  }
  // Clear the form inputs
  streamInput.value = "";
  instructionInput.value = "";
});

// Add event listener to the form submit event(prompt add)
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const promptInput = document.getElementById("prompt");
  const descriptionInput = document.getElementById("description");
  const prompt = promptInput.value;
  const description = descriptionInput.value;

  promptInput.disabled = false;

  add_key_value(prompt, description, "prompts_table");
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
  // Clear the form inputs
  promptInput.value = "";
  descriptionInput.value = "";
});

function add_key_value(prompt, description, table_name) {
  console.log(prompt, " ", description, " ", table_name);
  let jsonData = "";
  getFromChromeStorage(table_name)
    .then((res) => {
      jsonData = res;
      let data = {};
      console.log("local jsonData: ", jsonData);
      if (jsonData && table_name == "prompts_table") {
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
