/** @format */

const css = `
.query-input{
	resize: vertical;
}

#imageicon{
	width: 42px;
	height: 42px;
	max-width: none !important;
}

#submitIcon{
	width: 20px;
	height: 20px;	
	max-width: none !important;
}

#submit-button{
	display: flex;
    justify-content: center;
    align-items: center;	
}

#floatingButton {
  position: absolute;
  display: none;
  justify-content: center;
  align-items: center;

  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  z-index: 9999;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.3s;  
}

#floatingButton:hover {
  transform: scale(1.1);
  /* Increased scale on hover */
}

#floatingButton img {
//   max-width: 100%;
//   max-height: 100%;
}

#floatingButton:focus {
  outline: none;
}

#floatingButton:active {
  transform: scale(0.95);
}
#insertBox {
  position: absolute;
  display: none;
  top: 0;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  margin: 0;
  padding: 0.5rem;
  background-color: #17475a;
  min-width: 480px;
  min-height: 135px;
  max-width: 650px;
  font-size: small;
  z-index: 9999;
  resize: both;
  overflow: auto;  
}

#insertDrag{
  z-index: 101;
}

p {
  margin: 0;
}

#query-input {
	margin-left: 4px;
  min-height: 45px;
	border: 1px solid #ccc;
	border-radius: 4px;  
	white-space: normal;
	word-break: break-all;
	width: 100%;  
	margin-right: 10px;
	margin-bottom: 5px;
	overflow-x: hidden;
	overflow-y: auto;
	margin-right: 10px;
	scrollbar-width: thin;
}

#ai-selector{
  margin-left: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;  
  white-space: normal;
  word-break: break-all;
  width: calc(100% - 45px);  
  margin-right: 6px;
  margin-bottom: 5px;
  scrollbar-width: thin;  
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 32px;
}

#stream-selector{
  margin-left: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;  
  white-space: normal;
  word-break: break-all;
  width: 50%;  
  margin-right: 6px;
  margin-bottom: 5px;
  scrollbar-width: thin;  
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 32px;
}

#prompt-selector{
  border: 1px solid #ccc;
  border-radius: 4px;  
  white-space: normal;
  word-break: break-all;
  width: 50%;  
  margin-right: 42px;
  margin-bottom: 5px;
  scrollbar-width: thin;  
  overflow: scroll;
  overflow-x: hidden;
  overflow-y: auto;
  height: 32px;
}

#close-button {
	display: flex;
    align-items: center;
    justify-content: center;
	height: 32px;	
	width: 32px;
	color: red;
}

.submit-button {
	width: 32px;
	height: 32px;
	margin-top: auto;
	margin-bottom: auto;
}

#query-selector{  
  width: 100%;
  height: 100%;    
}

#icon-plane::before, #icon-plane::after{
  content:"";
  visibility:hidden;
}

#answer {
  color: white;
}

#answerWrapper {
  display: none;
  background-color: #333333;
  border-radius: 8px;
  padding: 0.5rem;
  margin-top: 0.5rem;
}

#queriesAnswersContainer {
  display: none;
  color: white;
  margin-top: 0.5rem;
}

.queriesAnswers {
  border-radius: 8px;
  background-color: #333333;
  padding: 0.5rem;
}

#lastQuery {
  color: rgb(188, 188, 188);
}

#lastAnswer {
  color: white;
  margin-top: 0.5rem;
}

#lastRequest {
  padding: 0.5rem;
  margin-top: 0.5rem;
  background-color: #333333;
  border-radius: 4px;
}

.btn {
  background-color: white;
  color: black;
  font-size: medium;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  padding: 0.5rem;
}

.btn:hover {
  background-color: #d0d0d0;
}

.btn:disabled {
  background-color: #a7a7a7;
  color: rgb(255, 255, 255);
  cursor: default;
}

// .btn img {
//   width: 1rem;
//   height: 1rem;
// }

.copyRow {
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  color: #a7a7a7;
  margin-top: 0.5rem;
}

.copyText {
  display: none;
  color: #a7a7a7;
  margin-right: 0.5rem;
}

.copyButton {
  font-size: medium;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  height:20px;
  width: 20px;
  padding: 0;
  margin-left: 0.5rem;
}

.copyButton:hover {
  color: #d0d0d0;
  background-color: transparent;
}

.insertButton {
  font-size: medium;
  color: white;
  background-color: transparent;
  border: none;
  height:20px;
  width: 20px;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
}

.insertButton:hover {
  color: #d0d0d0;
  background-color: transparent;
}

.removeButton {
  font-size: medium;
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.removeButton:hover {
  color: #d0d0d0;
  background-color: transparent;
}

.show-hide-wrapper {
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  margin-top: 0.5rem;
}

#clear-button {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

#clear-button:hover {
  color: #d0d0d0;
}

#show-hide-last-answer-button {
  color: white;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0.5rem;
}

#show-hide-last-answer-button:hover {
  color: #d0d0d0;
}

.input-label {
  font-weight: bold;
  font-size: medium;
}

.input-container {
  display: flex;
  flex-direction: row;
  align-items: center;  
}

.input-container input {
  width: 100%;
  outline: none;
  padding: 0.5rem;
  margin-right: 0.5rem;
}

#loading-indicator {
  display: none;
  color: white;
  margin-top: 0.5rem;
}

.stage {
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  margin: 0 -5%;
  overflow: hidden;
}

.dot-flashing {
  position: relative;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #ffffff;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
  left: 30px;
}

.dot-flashing::before,
.dot-flashing::after {
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #ffffff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #ffffff;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

@keyframes dot-flashing {
  0% {
      background-color: #ffffff;
  }

  50%,
  100% {
      background-color: rgba(196, 196, 198, 0.2);
  }
}
`;

let assistants = [];

let currentPosX = 0;
let currentPosY = 0;

// extract data from storage
async function getFromChromeStorage(key) {
  console.log("key table called...");
  console.log(key);
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

getFromChromeStorage("prompts_table")
  .then((res) => {
    console.log("from storage: ", res);
  })
  .catch((err) => {
    console.log(err);
  });

// feature that implement 'Always on Top' in option
async function getTopChecked() {
  const request = await new Promise((ree) =>
    chrome.storage.local.get(["topChecked"], (result) => ree(result.topChcked))
  );
  console.log(request);
  return request;
}
let topChecked = false;

// set as the chrome extension as always on top
getTopChecked()
  .then((result) => {
    topChecked = result;
  })
  .catch((err) => {
    console.log(err);
  });
console.log("contents acc: ", topChecked);
const _md =
  "b2d80efc8db1a49f3c39a9419fd6bb41a17ef583e37a8bcd5fe8305bda33da601cfbd26f1696211996f6c039db85408990f6bc3eb52158788f6637276217912a8dcea62117bc27057bc1c78c89f9bdd4eada7a460db7efcabb2dc0b641dd4b1f6564b5b0a583e163068ec30c5e41880e6d593cab053dccfde4ee56b5711c7cc3b222d8cb7adcf25a18bce165c9d57244c68d87c33200f9e4d9ecd8090c829c9139f4410773d77bf6be987bbb148771ea98c820b74330a436c667c1d4796d334cdf0c662d9a40398e14c25009169688ce1b4924cb620a894778dab8765d43e31cef58246d332738f7ccdd5b8a5169e27682ea2d39a54c8b5b9d3cbfd53ecc012edd99d1d57fa0176ce1a41317b8a00aa19a5a948c8a681da968d90e69f2be4c86587e844cbbaeb73ff264c7c7bcbc161030fd99103dd6560afa0027b782130bf1b505acbb74b167aa9e80df101ec88dc0d5267b6865d1d5f34dbb2ff0473f37aa33102812ad2a46efd175fe7aca77c25b5de2ba8170a6027ec437aaef94f1c2ed2d4fd36f3f55f38a4e6ec5300dfaee9cba7b16149b5d4d2b3bef692611436e61e059f881d12ec5d6c3b05306a745e49ad846e6082375fb5c8fba66ec55acabdf56e5e48b0848cca9e8ac0f6b76f2d8cf1a417385efadaabf30ac6ea74d9f812719bb44505c608222cbe056671614d26809783190fe29133993cd53708cc9df874b5e7320ce527b3ffe4539cb95d3828985d34b6ef3f8be373e7b84292f76b1cebafd4c377f5c4916ef300fed1b019b7e9b806ce3fdac8e81a753fd3673fce4bf40b6ab334e95d061a9cc1244be3e76f930d16d5d0a17521d5a683a4b5103945be47a5c04af65472bef12b2ee7b1d7a1b89474ae1febbab13304e1b55fc04ff211370dfc07803f15736fe53784f4c46fb606debff71edced07cde118059e3dbfd8962fb31bd5d016e9d2320274d7d2cd6388c34173ee004cb490f8fb973d3bca729d9d1054a814d8bfbc17f08347c21aba27e8af6217303d236f9bfce20260e0342f88fc6b7be1c6f421fa28a94243a0787315e2b3960f992ce55adc531c375e5575f3f15efee5bb51deefb9d819b79eb28f2cd8fdebff6c15aea1ce84e74354d6f458f91f260b388b51a77e65eb284a0928ae87b3361d6d0653c402c5a62f1ca061db579c9ef5243b04a9788fc5e4cec679721d8de94c27fe45e1ac837eb8cdf1609070d2db50a18483cdc2d240935966cfae629ca19a91068a6ab112b7b4b887e8a26e4e9dab4b6b20f17de533c92c38ac289e2717b4120566c3e961bd354741507b0e28fb8e1283d5087696caaabdcdbe60a660e2b2a3d9859676c025ed100f202c3a2d922af4ff211b6fe1168a55a0bced4d14e8cda5e68d655d75bcb8a3894a22fcadf14ca7a7fe15585b7821bf68c05e902493b0e46eb47613ea1438ef4";

let pasteTarget = "";

const style = document.createElement("style");
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);

const floatingButton = document.createElement("div");
floatingButton.id = "floatingButton";
const image = document.createElement("div");
image.innerHTML =
  "<img id = 'floatingButton_img' width='60px' height='60px' src='https://i.ibb.co/nLdTFXS/icon3.png' alt='animal' display = 'block'>";
floatingButton.appendChild(image);
document.body.appendChild(floatingButton);

const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
document.head.appendChild(link);

const inputFields = document.querySelectorAll(
  'input[type="text"], input[type="password"], textarea'
);

// display answer from openai
function displayQueriesAnswers() {
  chrome.storage.local.get(["queriesAnswers"], ({ queriesAnswers }) => {
    if (!queriesAnswers || queriesAnswers.length === 0) {
      return;
    }

    queriesAnswers = queriesAnswers.reverse();

    if (queriesAnswers.length > 0) {
      showHideWrapper.style.display = "flex";

      queriesAnswersContainer.innerHTML = "";

      queriesAnswers.forEach(({ query, answer, timeStamp }, i) => {
        const answerWithBreaks = answer.replace(/\n/g, "<br>");

        const item = document.createElement("div");
        item.className = "queriesAnswers";

        item.style.marginBottom =
          i < queriesAnswers.length - 1 ? "0.5rem" : "0";

        const removeButton = `<button id=removeButton${i} class="btn removeButton" title="Remove this query and answer from the list"><i class="fa fa-trash"></i></button>`;

        const copyButton = `<button id=copyLastAnswer${i} class="btn copyButton" title="Copy the Answer to the Clipboard"><i style="font-size: small"></i></button>`;
        const insertButton = `<button id=copyLastAnswer${i} class="btn insertButton" title="Insert the Answer to the edit"><i class="fa-sharp fa-light fa-paste" style="color: #090101;"></i></button>`;
        const options = {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        const time = new Date().toLocaleString("en-US", options);
        const timeStampElem = `<div class="timeStamp">${
          timeStamp || time
        }</div>`;

        item.innerHTML = `
          <div style="color: rgb(18, 18, 18); margin-bottom: 0.2rem;">${query}</div>
          <div>${answerWithBreaks}</div>
          <div class="copyRow">
            ${timeStampElem}
            <div>${removeButton}${copyButton}${insertButton}</div>
          </div>
        `;

        queriesAnswersContainer.appendChild(item);

        document
          .getElementById(`removeButton${i}`)
          .addEventListener("click", () => {
            queriesAnswers.splice(i, 1);

            chrome.storage.local.set({ queriesAnswers }, () => {
              console.log("queriesAnswers array updated");
            });

            item.remove();

            if (queriesAnswers.length === 0) {
              showHideWrapper.style.display = "none";
              queriesAnswersContainer.style.display = "none";
            }
          });

        document
          .getElementById(`copyLastAnswer${i}`)
          .addEventListener("click", () => {
            const answerText = answer;

            navigator.clipboard
              .writeText(answerText)
              .then(() => console.log("Answer text copied to clipboard"))
              .catch((err) => console.error("Could not copy text: ", err));
          });
      });
    } else {
      showHideWrapper.style.display = "none";
    }
  });
}

// extension dialog
var insertBox = document.createElement("div");
insertBox.id = "insertBox";

// components that consists of imageIcon, promptSelector, closeButton, query_input, submitButton
// initially visible to user
const inputContainer = document.createElement("div");

// red A! icon at the left of extension dialog
const imageIcon = document.createElement("div");
imageIcon.innerHTML =
  "<img id = 'imageicon' width='40px' height='40px' style='cursor:pointer' src='https://i.ibb.co/W0CvvZV/icon2.png' alt='animal' display = 'block'>";
inputContainer.appendChild(imageIcon);

inputContainer.classList.add("input-container", "form-group");

// 4 elements including promptSelector, closeButton, query_input, submitButton
const query_selector = document.createElement("span");
query_selector.id = "query-selector";

// closeButton
const closeButton = document.createElement("button");
closeButton.id = "close-button";
closeButton.classList.add("btn", "closeButton");
closeButton.title = "Close";
closeButton.innerHTML = `<i class="fa fa-times"></i>`;

// streamSelector
const stream_select = document.createElement("select");
stream_select.id = "stream-selector";
stream_select.innerHTML =
  '<select class="form-select" id="chatThread"> </select>';

// promptSelector
const prompt_select = document.createElement("select");
prompt_select.id = "prompt-selector";
prompt_select.innerHTML =
  '<select class="form-select" id="apiModel"> </select>';
inputContainer.appendChild(query_selector);
// inputContainer.appendChild(closeButton);

let _data = {};

// get streams from chrome local storage
getFromChromeStorage("streams_table")
  .then((res) => {
    console.log("from storage: ", res);
    assistants = res;
    var optionElement = document.createElement("option"); // Create an option element
    optionElement.value = "SELECT_STREAM"; // Set the value of the option to the key
    optionElement.textContent = "SELECT_STREAM"; // Set the text content of the option to the key
    stream_select.appendChild(optionElement);
    if (res) {
      // Parse the JSON data into a JavaScript object
      try {
        for (var asstIdx in res) {
          console.log("$$$ " + res[asstIdx]["name"]);
          var optionElement = document.createElement("option"); // Create an option element
          optionElement.value = res[asstIdx]["name"]; // Set the value of the option to the key
          optionElement.textContent = res[asstIdx]["name"]; // Set the text content of the option to the key
          stream_select.appendChild(optionElement); // Append the option to the select element
        }
      } catch (err) {
        console.log(err);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });

// get prompts from chrome local storage
getFromChromeStorage("prompts_table")
  .then((res) => {
    console.log("from storage: ", res);
    _jsonData = res;
    var optionElement = document.createElement("option"); // Create an option element
    optionElement.value = "SELECT_PROMPT"; // Set the value of the option to the key
    optionElement.textContent = "SELECT_PROMPT"; // Set the text content of the option to the key
    prompt_select.appendChild(optionElement);
    if (_jsonData) {
      // Parse the JSON data into a JavaScript object
      try {
        _data = JSON.parse(_jsonData) || {};
        for (var key in _data) {
          if (_data.hasOwnProperty(key)) {
            var optionElement = document.createElement("option"); // Create an option element
            optionElement.value = key; // Set the value of the option to the key
            optionElement.textContent = key; // Set the text content of the option to the key
            prompt_select.appendChild(optionElement); // Append the option to the select element
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
let prompt_question = "";

// query input element
const query_input = document.createElement("textarea");
query_input.type = "text";
query_input.id = "query-input";
query_input.placeholder = "What's on your mind?";
query_input.className = "query-input";

query_input.focus();

const submitButton = document.createElement("button");
submitButton.id = "submit-button";
submitButton.className = "submit-button";
submitButton.classList.add("btn");
submitButton.disabled = true;

// message receive time
let time = new Date().toLocaleString("en-US");

const systemMessage =
  "You are a helpful chat bot. Your answer should not be too long. current time: " +
  time;

let messageArray = [{ role: "system", content: systemMessage }];

const submitButtonIcon = document.createElement("div");
submitButtonIcon.innerHTML =
  "<img id = 'submitIcon' width = '30px' height = '30px' src = 'https://i.ibb.co/25GBCD1/icons8-paper-plane-50.png', alt = 'sbumit button', display = 'block'/>";

submitButton.appendChild(submitButtonIcon);

chrome.runtime.sendMessage({ api_initiated: true });

query_input.addEventListener("keyup", () => {
  if (query_input.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
});

query_input.addEventListener("keyup", (event) => {
  if (event.code === "Enter") {
    event.preventDefault();
    submitButton.click();
  }
});

function adjustHeight() {
  query_input.style.height = "auto";
  query_input.style.height = query_input.scrollHeight + "px";
}

const stage = document.createElement("div");
stage.id = "stage";

const loadingIndicator = document.createElement("div");
loadingIndicator.id = "loading-indicator";
loadingIndicator.classList.add("dot-flashing");

stage.appendChild(loadingIndicator);

const answerWrapper = document.createElement("div");
answerWrapper.id = "answerWrapper";

const answer = document.createElement("div");
answer.id = "answer";

const timestamp = document.createElement("span");
timestamp.id = "timestamp";
timestamp.style.color = "white";
const copyButton = document.createElement("button");
copyButton.id = "copyAnswer";
copyButton.classList.add("btn", "copyButton");
copyButton.title = "Copy the Answer to the Clipboard";
const copyButtonIcon = document.createElement("div");

copyButtonIcon.innerHTML =
  "<img id = 'copyIcon' width='30px' height='30px' src='https://i.ibb.co/qxjmzD7/icons8-copy-48.png' alt='animal' display = 'block'>";
copyButton.appendChild(copyButtonIcon);

const insertButton = document.createElement("button");
insertButton.id = "insertAnswer";
insertButton.classList.add("btn", "insertButton");
insertButton.title = "Insert the Answer to the edit";
const insertButtonIcon = document.createElement("div");
insertButton.innerHTML =
  "<img id = 'insertIcon' width = '30px' height = '30px' src = 'https://i.ibb.co/qrpVSVw/icons8-insert-column-right-48.png' alt = 'isnert button' display = 'block'>";

insertButton.appendChild(insertButtonIcon);

answerWrapper.appendChild(timestamp);
answerWrapper.appendChild(copyButton);
answerWrapper.appendChild(insertButton);
answerWrapper.appendChild(answer);

const showHideWrapper = document.createElement("div");
showHideWrapper.id = "show-hide-wrapper";
showHideWrapper.classList.add("show-hide-wrapper");

const lastRequestsTitle = document.createElement("span");
lastRequestsTitle.id = "lastRequestsTitle";
lastRequestsTitle.style.fontWeight = "bold";

const clearButton = document.createElement("button");
clearButton.id = "clear-button";
clearButton.classList.add("btn");
clearButton.title = "Clear last conversations";
const clearButtonIcon = document.createElement("i");
clearButtonIcon.classList.add("fa", "fa-trash-can");
clearButton.appendChild(clearButtonIcon);

const showHideLastAnswerButton = document.createElement("button");
showHideLastAnswerButton.id = "show-hide-last-answer-button";
showHideLastAnswerButton.classList.add("btn");
showHideLastAnswerButton.title = "Toggle last conversations";
const showHideLastAnswerButtonIcon = document.createElement("i");
showHideLastAnswerButtonIcon.classList.add("fa", "fa-eye");
showHideLastAnswerButton.appendChild(showHideLastAnswerButtonIcon);

showHideWrapper.appendChild(lastRequestsTitle);
showHideWrapper.appendChild(clearButton);
showHideWrapper.appendChild(showHideLastAnswerButton);

const queriesAnswersContainer = document.createElement("div");
queriesAnswersContainer.id = "queriesAnswersContainer";

function findAssistantId() {
  var asstId = "";
  console.log("++++++++++++++");
  console.log(assistants);
  var asstname = "";
  asstname = stream_select.value;
  if (asstname !== "SELECT_STREAM") {
    for (var asstIdx in assistants) {
      if (asstname === assistants[asstIdx]["name"]) {
        asstId = assistants[asstIdx]["id"];
      }
    }
  } else {
    if (asstname === "Default") {
      asstId = assistants[asstIdx]["id"];
    }
  }
  return asstId;
}

let thdId = "";
getFromChromeStorage("openai_thdid")
  .then((res) => {
    console.log("from storage THD: ", res);
    thdId = res;
  })
  .catch((err) => {
    console.log("Can't find openai thread id");
    console.log(err);
  });

//click answer button
// submitButton.addEventListener("click", async () => {
//   const message = query_input.value;
//   messageArray.push({ role: "user", content: message });
//   var asstId = findAssistantId();
//   var content = query_input.value;
//   var thdid = JSON.parse(thdId)["openai_thdid"];

//   if (asstId == undefined || !asstId) {
//     alert("Please select Stream");
//     return;
//   }
//   if (thdid == undefined) {
//     alert("An error occured.\nPlease reinstall the extension.");
//     return;
//   }
//   if (content == undefined) {
//     alert("You didn't select any text.");
//     return;
//   }
//   let gptAnswer = "data";
//   // Display the loading indicator at the start
//   loadingIndicator.style.display = "block";
//   answer.innerHTML = "";
//   answerWrapper.style.display = "none";
//   try {
//     fetch("https://al3rt.me/openai/run", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         thdid: thdid,
//         asstid: asstId,
//         content: content,
//       }),
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         // Handle the response data here
//         console.log(data);
//         gptAnswer = data["content"][0]["text"];
//         console.log(gptAnswer);
//         answerWrapper.style.display = "block";
//         let answerWithBreaks = gptAnswer.replace(/\n/g, "<br>");

//         // Add the fetched content to the page
//         answer.innerHTML = answerWithBreaks;
//         answerWrapper.style.display = "block";
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });

//     let count = 0;
//     copyAnswer.addEventListener("click", () => {
//       const answerText = gptAnswer;
//       navigator.clipboard
//         .writeText(answerText)
//         .then(() => console.log("Answer text copied to clipboard"))
//         .catch((err) => console.error("Could not copy text: ", err));
//     });

//     insertButton.addEventListener("click", () => {
//       if (count == 0 && pasteTarget.tagName == "TEXTAREA") {
//         // console.log(pasteTarget.tagName());
//         let answerText = "\n" + gptAnswer;
//         let finalTarget = pasteTarget.parentNode.querySelector(".D5aOJc.vJwDU");
//         console.log(
//           "previous content: ",
//           finalTarget.tagName,
//           finalTarget.className
//         );
//         query_input.value = "";
//         var exisitingText = finalTarget.value;
//         finalTarget.value = exisitingText + answerText;
//         setTimeout(function () {
//           finalTarget.dispatchEvent(new Event("input"));
//         }, 0);
//         console.log("current content is:", finalTarget.value);
//         pasteTarget = "";
//         count = +1;
//         answerWrapper.style.display = "none";
//         if (!topChecked) {
//           insertBox.style.display = "none";
//         }
//       } else if (
//         count == 0 &&
//         pasteTarget.classList.contains("public-DraftStyleDefault-block")
//       ) {
//         let answerText = "\n" + gptAnswer;
//         query_input.value = "";
//         var terminalTarget = pasteTarget.querySelector("span");
//         var finalTarget = terminalTarget.querySelector("span");
//         finalTarget.innerHTML += answerText;
//         finalTarget.textContent += " ";
//         finalTarget.textContent = finalTarget.textContent.trim();
//         pasteTarget = "";
//         count = +1;
//         answerWrapper.style.display = "none";
//         if (!topChecked) {
//           insertBox.style.display = "none";
//         }
//       } else if (count == 0) {
//         let answerText = "\n" + gptAnswer;
//         console.log("previous content: ", pasteTarget.innerHTML);
//         query_input.value = "";

//         pasteTarget.innerHTML += answerText;
//         console.log("current content is:", pasteTarget.innerHTML);
//         pasteTarget = "";
//         count = +1;
//         answerWrapper.style.display = "none";
//         if (!topChecked) {
//           insertBox.style.display = "none";
//         }
//       }
//     });

//     const options = {
//       month: "short",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       second: "2-digit",
//     };
//     const time = new Date().toLocaleString("en-US", options);

//     timestamp.innerText = time;

//     loadingIndicator.style.display = "none";
//   } catch (error) {
//     console.error("Error:", error);
//     answer.innerText = "Failed to load data.";
//     answerWrapper.style.display = "block";
//   } finally {
//     // Hide the loading indicator after fetch operation is complete
//     loadingIndicator.style.display = "none";
//   }
// });
submitButton.addEventListener("click", async () => {
  const message = query_input.value;
  messageArray.push({ role: "user", content: message });
  var asstId = findAssistantId();
  var content = query_input.value;
  var thdid = JSON.parse(thdId)["openai_thdid"];

  if (asstId === undefined || !asstId) {
    alert("Please select Stream");
    return;
  }
  if (thdid === undefined) {
    alert("An error occured.\nPlease reinstall the extension.");
    return;
  }
  if (content === undefined) {
    alert("You didn't select any text.");
    return;
  }

  // Display the loading indicator at the start
  loadingIndicator.style.display = "block";
  answer.innerHTML = "";
  answerWrapper.style.display = "none";
  // loadingIndicator.style.display = "block";
  try {
    let response = await fetch("https://al3rt.me/openai/run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        thdid: thdid,
        asstid: asstId,
        content: content,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    let data = await response.json();

    // Handle the response data here
    console.log(data);
    let gptAnswer = data["content"][0]["text"];
    console.log(gptAnswer);
    let answerWithBreaks = gptAnswer.replace(/\n/g, "<br>");

    // Add the fetched content to the page
    answer.innerHTML = answerWithBreaks;
    answerWrapper.style.display = "block";
  } catch (error) {
    console.error("Error:", error);
    answer.innerText = "Failed to load data.";
    answerWrapper.style.display = "block";
  } finally {
    // Hide the loading indicator after fetch operation is complete
    loadingIndicator.style.display = "none";
  }

  const options = {
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  const time = new Date().toLocaleString("en-US", options);
  timestamp.innerText = time;
});

function checkPrompt(prompt_question) {
  let promptLen = 0;
  try {
    promptLen = prompt_question.length;
    return promptLen;
  } catch (err) {
    console.log(err);
    return promptLen;
  }
}
// promptSelector that was manualized in option
prompt_select.addEventListener("change", () => {
  // prompt_question = _data[prompt_select.value];
  let prompt_header = prompt_select.value;
  if (prompt_select.value === "SELECT_PROMPT") {
    prompt_header = "";
  }
  prompt_question = prompt_header;
  let result = checkPrompt(prompt_question);
  console.log(result);
  if (result == 0) {
    prompt_question = "";
  } else {
    prompt_question += "\n";
  }
  if (localStorage.getItem("selectedText").length > 0) {
    query_input.value = prompt_question + localStorage.getItem("selectedText");
    submitButton.disabled = false;
  }
});
//  AI model selection group
const aiModelSelectGroup = document.createElement("div");
aiModelSelectGroup.style.display = "flex";
// Create a new select element
var aiModels = document.createElement("select");
aiModels.id = "ai-selector";
aiModels.classList.add("form-select");
// aiModels.id = "apiModel";

// Create option 1
var option1 = document.createElement("option");
option1.value = "gpt-3.5";
option1.textContent = "GPT-3.5";

// Create option 2
var option2 = document.createElement("option");
option2.value = "gpt-4 (beta)";
option2.textContent = "GPT-4 (beta)";

// Append options to the select element
aiModels.appendChild(option1);
aiModels.appendChild(option2);

// Append the select element to a specific location in the document
aiModelSelectGroup.appendChild(aiModels);
aiModelSelectGroup.appendChild(closeButton);

// stream, prompt selection group
const promptSelectGroup = document.createElement("span");
promptSelectGroup.style.display = "flex";
promptSelectGroup.appendChild(stream_select);
promptSelectGroup.appendChild(prompt_select);
// promptSelectGroup.appendChild(closeButton);

// query answer selection group
const queryInputGroup = document.createElement("span");
queryInputGroup.style.display = "flex";

queryInputGroup.appendChild(query_input);
queryInputGroup.appendChild(submitButton);

// whole ui to add groups
query_selector.appendChild(aiModelSelectGroup);
query_selector.appendChild(promptSelectGroup);
query_selector.appendChild(queryInputGroup);

inputContainer.appendChild(query_selector);

queriesAnswersContainer.style.display = "none";
showHideWrapper.style.display = "none";
lastRequestsTitle.innerText = chrome.i18n.getMessage("lastMessagesTitle");
showHideLastAnswerButton.addEventListener("click", () => {
  if (queriesAnswersContainer.style.display === "none") {
    queriesAnswersContainer.style.display = "block";

    showHideLastAnswerButton.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    queriesAnswersContainer.style.display = "none";

    showHideLastAnswerButton.innerHTML = '<i class="fa fa-eye"></i>';
  }
});

queriesAnswersContainer.style.display = "none";
showHideWrapper.style.display = "none";
lastRequestsTitle.innerText = chrome.i18n.getMessage("lastMessagesTitle");
showHideLastAnswerButton.addEventListener("click", () => {
  if (queriesAnswersContainer.style.display === "none") {
    queriesAnswersContainer.style.display = "block";

    showHideLastAnswerButton.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
    queriesAnswersContainer.style.display = "none";

    showHideLastAnswerButton.innerHTML = '<i class="fa fa-eye"></i>';
  }
});

chrome.storage.local.get(["queriesAnswers"], ({ queriesAnswers }) => {
  if (!queriesAnswers || queriesAnswers.length === 0) {
    return;
  }

  queriesAnswers = queriesAnswers.reverse();

  if (queriesAnswers.length > 0) {
    showHideWrapper.style.display = "flex";

    queriesAnswersContainer.innerHTML = "";

    queriesAnswers.forEach(({ query, tmpAnswer, timeStamp }, i) => {
      const answerWithBreaks = tmpAnswer.replace(/\n/g, "<br>");

      const item = document.createElement("div");
      item.className = "queriesAnswers";

      item.style.marginBottom = i < queriesAnswers.length - 1 ? "0.5rem" : "0";

      const removeButton = `<button id=removeButton${i} class="btn removeButton" title="Remove this query and answer from the list"><i class="fa fa-trash"></i></button>`;

      const copyButton = `<button id=copyLastAnswer${i} class="btn copyButton" title="Copy the Answer to the Clipboard"><i class="fa fa-copy" style="font-size: small"></i></button>`;
      const insertButton = `<button id=copyLastAnswer${i} class="btn insertButton" title="Insert the Answer to the edit"><i class="fa-sharp fa-light fa-paste" style="color: #090101;"></i></button>`;

      const options = {
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const time = new Date().toLocaleString("en-US", options);
      const timeStampElem = `<div class="timeStamp">${timeStamp || time}</div>`;

      item.innerHTML = `
        <div style="color: rgb(188, 188, 188); margin-bottom: 0.2rem;">${query}</div>
        <div>${answerWithBreaks}</div>
        <div class="copyRow">
          ${timeStampElem}
          <div>${removeButton}${copyButton}${insertButton}</div>
        </div>
      `;

      queriesAnswersContainer.appendChild(item);

      document
        .getElementById(`removeButton${i}`)
        .addEventListener("click", () => {
          queriesAnswers.splice(i, 1);

          chrome.storage.local.set({ queriesAnswers }, () => {
            console.log("queriesAnswers array updated");
          });

          item.remove();

          if (queriesAnswers.length === 0) {
            showHideWrapper.style.display = "none";
            queriesAnswersContainer.style.display = "none";
          }
        });

      document
        .getElementById(`copyLastAnswer${i}`)
        .addEventListener("click", () => {
          const answerText = answer;

          navigator.clipboard
            .writeText(answerText)
            .then(() => console.log("Answer text copied to clipboard"))
            .catch((err) => console.error("Could not copy text: ", err));
        });
    });
  } else {
    showHideWrapper.style.display = "none";
  }
});

insertBox.appendChild(inputContainer);
insertBox.appendChild(stage);
insertBox.appendChild(answerWrapper);

// show extension UI when icon selected
function showInputFields(e) {
  query_input.focus();
  if (!topChecked) {
    const selectedText = localStorage.getItem("selectedText");
    if (selectedText.length > 0) {
      if (selectedText.length > 6000) {
        alert("Selected text is over limit.\nText is limited now.");
      }
      query_input.value = prompt_question + selectedText.slice(0, 6000);
      submitButton.disabled = false;
    }
    insertBox.style.left = `${currentPosX - 375}px`;
    insertBox.style.top = `${currentPosY - 70}px`;
    if (currentPosX - 375 < 0) {
      insertBox.style.left = `${currentPosX + 50}px`;
    }
    if (currentPosY - 70 < 200) {
      insertBox.style.top = `${currentPosY + 50}px`;
    }
    if (currentPosY - 70 > window.screen.availHeight - 300) {
      insertBox.style.top = `${currentPosY - 270}px`;
    }
  }
  document.body.appendChild(insertBox);
  insertBox.style.display = "block";
  selectedText = "";
  adjustHeight();
}

// hide UI when iconImage clicked
function hideInputFields() {
  insertBox.style.display = "none";
}

// show extension UI when page text selected
function showFloatingButton(event) {
  if (selectedText.length > 0) {
    currentPosX = event.pageX + 20;
    currentPosY = event.pageY - 16;

    floatingButton.style.left = `${currentPosX}px`;
    floatingButton.style.top = `${currentPosY}px`;
    floatingButton.style.display = "block";
  }
}

let isMoved = false;
let isDown = false;
let offSet = [0, 0];
let mousePosition;
let isInsertBoxDown = false;
let insertBoxPosition;
let insertBoxOffset = [0, 0];
let showOrHide = false;

floatingButton.addEventListener("click", function (event) {
  isDown = false;
  showOrHide = !showOrHide;
  console.log(showOrHide);
  adjustHeight();
  if (showOrHide == true) {
    showInputFields(event);
    hideFloatingButton();
  } else {
    hideInputFields();
  }
});

function hideFloatingButton() {
  floatingButton.style.display = "none";
}

let selectedText = "";
document.addEventListener("mouseup", function (event) {
  getTopChecked()
    .then((result) => {
      topChecked = result;
    })
    .catch((err) => {
      console.log(err);
    });
  if (!topChecked) {
    if (
      event.target.id != "floatingButton_img" &&
      window.getSelection().toString().length > 0 &&
      event.target.id != "submit-button" &&
      event.target.id != "submitIcon"
    ) {
      selectedText = window.getSelection().toString();
      localStorage.setItem("selectedText", selectedText);
      pasteTarget = event.target;
      console.log(pasteTarget.id);
      showFloatingButton(event);
    }
  } else {
    if (
      event.target.id != "floatingButton_img" &&
      window.getSelection().toString().length > 0 &&
      event.target.id != "submit-button" &&
      event.target.id != "submitIcon"
    ) {
      selectedText = window.getSelection().toString();
      localStorage.setItem("selectedText", selectedText);
      pasteTarget = event.target;
      query_input.value = localStorage.getItem("selectedText");
      submitButton.disabled = false;
      showFloatingButton(event);
      hideFloatingButton();
      showInputFields(event);
    }
  }
});
let insertDrag = imageIcon;
console.log(insertDrag.id);
console.log(insertDrag.parentNode.id);

// function that make html element as dragable
function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt.id == "insertBox") {
    imageIcon.onmousedown = dragMouseDown;
  } else {
    imageIcon.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    hideFloatingButton();
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    hideFloatingButton();
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    hideFloatingButton();
  }
  hideFloatingButton();
}

// make insertBox as draggable
dragElement(insertBox);

function dragElementFloating(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (elmnt.id == "floatingButton") {
    floatingButton.onmousedown = dragMouseDown;
  } else {
    floatingButton.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

dragElementFloating(floatingButton);
closeButton.addEventListener("click", function (event) {
  hideInputFields();
});
