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
// const _md =
//   "b2d80efc8db1a49f3c39a9419fd6bb41a17ef583e37a8bcd5fe8305bda33da601cfbd26f1696211996f6c039db85408990f6bc3eb52158788f6637276217912a8dcea62117bc27057bc1c78c89f9bdd4eada7a460db7efcabb2dc0b641dd4b1f6564b5b0a583e163068ec30c5e41880e6d593cab053dccfde4ee56b5711c7cc3b222d8cb7adcf25a18bce165c9d57244c68d87c33200f9e4d9ecd8090c829c9139f4410773d77bf6be987bbb148771ea98c820b74330a436c667c1d4796d334cdf0c662d9a40398e14c25009169688ce1b4924cb620a894778dab8765d43e31cef58246d332738f7ccdd5b8a5169e27682ea2d39a54c8b5b9d3cbfd53ecc012edd99d1d57fa0176ce1a41317b8a00aa19a5a948c8a681da968d90e69f2be4c86587e844cbbaeb73ff264c7c7bcbc161030fd99103dd6560afa0027b782130bf1b505acbb74b167aa9e80df101ec88dc0d5267b6865d1d5f34dbb2ff0473f37aa33102812ad2a46efd175fe7aca77c25b5de2ba8170a6027ec437aaef94f1c2ed2d4fd36f3f55f38a4e6ec5300dfaee9cba7b16149b5d4d2b3bef692611436e61e059f881d12ec5d6c3b05306a745e49ad846e6082375fb5c8fba66ec55acabdf56e5e48b0848cca9e8ac0f6b76f2d8cf1a417385efadaabf30ac6ea74d9f812719bb44505c608222cbe056671614d26809783190fe29133993cd53708cc9df874b5e7320ce527b3ffe4539cb95d3828985d34b6ef3f8be373e7b84292f76b1cebafd4c377f5c4916ef300fed1b019b7e9b806ce3fdac8e81a753fd3673fce4bf40b6ab334e95d061a9cc1244be3e76f930d16d5d0a17521d5a683a4b5103945be47a5c04af65472bef12b2ee7b1d7a1b89474ae1febbab13304e1b55fc04ff211370dfc07803f15736fe53784f4c46fb606debff71edced07cde118059e3dbfd8962fb31bd5d016e9d2320274d7d2cd6388c34173ee004cb490f8fb973d3bca729d9d1054a814d8bfbc17f08347c21aba27e8af6217303d236f9bfce20260e0342f88fc6b7be1c6f421fa28a94243a0787315e2b3960f992ce55adc531c375e5575f3f15efee5bb51deefb9d819b79eb28f2cd8fdebff6c15aea1ce84e74354d6f458f91f260b388b51a77e65eb284a0928ae87b3361d6d0653c402c5a62f1ca061db579c9ef5243b04a9788fc5e4cec679721d8de94c27fe45e1ac837eb8cdf1609070d2db50a18483cdc2d240935966cfae629ca19a91068a6ab112b7b4b887e8a26e4e9dab4b6b20f17de533c92c38ac289e2717b4120566c3e961bd354741507b0e28fb8e1283d5087696caaabdcdbe60a660e2b2a3d9859676c025ed100f202c3a2d922af4ff211b6fe1168a55a0bced4d14e8cda5e68d655d75bcb8a3894a22fcadf14ca7a7fe15585b7821bf68c05e902493b0e46eb47613ea1438ef4";
window.addEventListener("load", () => {
  const titleText = document.getElementById("titleText");
  const apiText = document.getElementById("apiText");
  const chooseModelText = document.getElementById("choose-model-text");
  titleText.innerText = chrome.i18n.getMessage("optionsTitle");
  // apiText.innerText = chrome.i18n.getMessage("apiTitle");
  chooseModelText.innerText = chrome.i18n.getMessage("apiModelTitle");

  // const button = document.getElementById("submit");
  // button.disabled = true;
  const check = document.getElementById("check");
  check.disabled = true;
  // const content = document.getElementById("content");

  // content.type = "password";

  // content.addEventListener("input", () => {
  //   button.disabled = content.value.length < 10;
  // });

  // chrome.storage.local.get("apiKey", ({ apiKey }) => {
  //   if (apiKey) {
  //     content.value = apiKey;
  //   }
  // });
  // let isPinned = false;
  const checkButton = document.getElementById("check");
  // chrome.runtime.onMessage.addEventListener((message,sender,sendResponse) => {
  //   console.log(message);
  // });
  // const submit = document.getElementById("submit");
  // submit.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   const apiKeyy = content.value;
  //   const apiKey = encrypt(apiKeyy, _md);
  //   chrome.storage.local.set({ apiKey }, () => {
  //     const status = document.getElementById("status");
  //     status.innerHTML = "API key saved. The extension is ready to use.";
  //     status.style.color = "lightgreen";
  //   });
  //   button.disabled = true;
  //   checkButton.disabled = false;
  // });
  checkButton.addEventListener("click", function () {
    window.close();
  });

  // function deleteApiKey() {
  //   chrome.storage.local.set({ apiKey: "" });
  //   content.value = "";
  // }

  // const reset = document.getElementById("reset");
  // reset.addEventListener("click", (event) => {
  //   event.preventDefault();
  //   deleteApiKey();
  //   const status = document.getElementById("status");
  //   status.innerHTML = "API key deleted. Please enter a new API key.";
  //   status.style.color = "red";
  // });

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
