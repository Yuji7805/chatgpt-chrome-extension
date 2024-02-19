function encrypt(plaintext, key) {
  var encoder = new TextEncoder();
  var data = encoder.encode(plaintext);
  var encryptedData = new Uint8Array(data.length);

  for (var i = 0; i < data.length; i++) {
    encryptedData[i] = data[i] ^ key.charCodeAt(i % key.length);
  }

  var encodedText = base64Encode(encryptedData);
  return encodedText;
}

function base64Encode(data) {
  var chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var padding = (3 - (data.length % 3)) % 3;
  var encodedText = "";

  for (var i = 0; i < data.length; i += 3) {
    var group = (data[i] << 16) | (data[i + 1] << 8) | data[i + 2];

    encodedText +=
      chars.charAt((group >> 18) & 63) +
      chars.charAt((group >> 12) & 63) +
      chars.charAt((group >> 6) & 63) +
      chars.charAt(group & 63);
  }

  return (
    encodedText.slice(0, encodedText.length - padding) + "=".repeat(padding)
  );
}
window.addEventListener("load", () => {
  const titleText = document.getElementById("titleText");
  const apiText = document.getElementById("apiText");
  const chooseModelText = document.getElementById("choose-model-text");
  titleText.innerText = chrome.i18n.getMessage("optionsTitle");
  chooseModelText.innerText = chrome.i18n.getMessage("apiModelTitle");

  const check = document.getElementById("check");
  check.disabled = true;
  const checkButton = document.getElementById("check");
  checkButton.addEventListener("click", function () {
    window.close();
  });

  const apiModelSelect = document.getElementById("apiModel");
  chrome.storage.local.get("apiModel", ({ apiModel }) => {
    const defaultModel = "gpt-3.5-turbo";
    if (!apiModel) {
      chrome.storage.local.set({ apiModel: defaultModel });
      apiModelSelect.value = defaultModel;
    } else {
      apiModelSelect.value = apiModel;
    }
  });

  apiModelSelect.addEventListener("change", () => {
    chrome.storage.local.set({ apiModel: apiModelSelect.value });
  });
});
let topCheck = document.getElementById("topCheck");
chrome.storage.local.set({ topChecked: false });
topCheck.addEventListener("click", function () {
  console.log(topCheck.checked);
  chrome.storage.local.set({ topChecked: topCheck.checked });
});
console.log(topCheck.checked);
