let assistants = [];
function findAssistantId(asstname) {
  var asstId = "default asstid";
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
  var thdId = "";
  thdId = await getFromChromeStorage("openai_thdid");
  let thread_exist;
  try {
    thdId = JSON.parse(thdId);
    thread_exist = String(thdId["openai_thdid"]).startsWith("thread_");
    if (thread_exist) {
      console.log("using existing thread.", thdId["openai_thdid"]);
    }
  } catch {
    if (!thread_exist || thdId == undefined) {
      fetch(
        "https://main-monster-decent.ngrok-free.app/openai/threads/create",
        {
          method: "POST",
        }
      )
        .then((response) => response.json())
        .then((data) => {
          thdId = data["thdid"];
          console.log("thread created. ", thdId);
          add_key_value("openai_thdid", thdId, "openai_thdid");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}

makeThread();

async function fetchDataFromAPI() {
  const streamInput = document.getElementById("stream");
  const instructionInput = document.getElementById("instruction");
  chrome.storage.local.set({ streams_table: {} });
  console.log("fetching data from openai assistants");
  try {
    fetch("https://main-monster-decent.ngrok-free.app/openai/assistants", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        assistants = data.data;
        const __data = assistants;
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
              fetch(
                "https://main-monster-decent.ngrok-free.app/openai/assistants/delete",
                {
                  method: "DELETE",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    asstid: asstId,
                  }),
                }
              )
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

            if (item.name !== "Default") {
              actionsCell.appendChild(editButton);
              actionsCell.appendChild(deleteButton);
            }

            row.appendChild(nameCell);
            row.appendChild(instructionCell);
            row.appendChild(actionsCell);
            table_stream.appendChild(row);
          }
        }
      })
      .catch((error) => {
        var siteLink = "https://main-monster-decent.ngrok-free.app";

        if (
          window.confirm(
            "Did you log in to the site?\nClick OK to visit the site: " +
              siteLink
          )
        ) {
          window.open(siteLink, "_blank");
        }
        console.error("Error fetching data:", error);
      });
  } catch (error) {
    console.error("Error fetching data from openai assistants:", error);
  }
}

fetchDataFromAPI();

// prompts table data
let _data = {};
// streams table data
let __data = {};

// Add event listener to the (add stream)form submit event
form_stream.addEventListener("submit", async function (e) {
  e.preventDefault();

  const streamInput = document.getElementById("stream");
  const stream = streamInput.value;
  const instructionInput = document.getElementById("instruction");
  const instruction = instructionInput.value;

  streamInput.disabled = false;

  const _data_To_Create_Assistant = {
    instruction: instruction,
    "assist-name": stream,
    "assist-type": "code_interpreter",
  };
  if (selectedRow) {
    console.log("modifying....");
    const _data_To_Modify_Assistant = {
      asstid: findAssistantId(stream),
      instruction: instruction,
      "assist-name": stream,
      "assist-type": "code_interpreter",
    };
    fetch(
      "https://main-monster-decent.ngrok-free.app/openai/assistants/modify",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(_data_To_Modify_Assistant),
      }
    )
      .then((data) => {
        console.log(data);
        selectedRow.cells[0].textContent = stream;
        selectedRow.cells[1].textContent = instruction;
        selectedRow = null;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    console.log("testing existing streams.", stream);
    console.log(findAssistantId(stream));
    if (!findAssistantId(stream).startsWith("default") > 0) {
      alert("Stream already exist!");
      streamInput.value = "";
      instructionInput.value = "";
      return;
    }
    console.log(_data_To_Create_Assistant);
    // Make the POST request using fetch
    fetch(
      "https://main-monster-decent.ngrok-free.app/openai/assistants/create",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(_data_To_Create_Assistant),
      }
    )
      .then((data) => {
        console.log("successed to create an assistant: ", stream);
        console.log(data);
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
          fetch(
            "https://main-monster-decent.ngrok-free.app/openai/assistants/delete",
            {
              method: "DELETE",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                asstid: asstId,
              }),
            }
          )
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
        // save stream name and instruction
        add_key_value(stream, instruction, "streams_table");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  // Clear the form inputs
  streamInput.value = "";
  instructionInput.value = "";
});

// Add event listener to the form submit event(prompt add)
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const promptInput = document.getElementById("prompt");
  const descriptionInput = document.getElementById("description");
  const prompt = promptInput.value;
  const description = descriptionInput.value;

  promptInput.disabled = false;

  add_key_value(prompt, description, "prompts_table");
  if (selectedRow) {
    selectedRow.cells[0].textContent = prompt;
    selectedRow.cells[1].textContent = description;
    selectedRow = null;
  } else {
    const row = table.insertRow(-1);

    const promptCell = row.insertCell(0);
    promptCell.textContent = prompt;

    const descriptionCell = row.insertCell(1);
    descriptionCell.textContent = description;

    const editButton = document.createElement("button");
    editButton.className = "btn btn-success";
    editButton.textContent = "Edit";
    editButton.style =
      "margin-left:10px; margin-right:10px; margin-top:5px; margin-bottom:5px";
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
      if (jsonData && table_name == "prompts_table") {
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
      if (table_name == "prompts_table") {
        chrome.storage.local.set({ prompts_table: updatedJsonData });
      } else if (table_name == "streams_table") {
        chrome.storage.local.set({ streams_table: updatedJsonData });
      } else {
        chrome.storage.local.set({ openai_thdid: updatedJsonData });
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
