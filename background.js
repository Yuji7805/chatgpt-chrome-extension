chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.tabs.create({ url: "options.html" });
  }
  checkIfPinned();
});
async function checkIfPinned() {
  let userSettings = await chrome.action.getUserSettings();
  if (userSettings.isOnToolbar == "true") {
    console.log("toolbar is on");
  } else {
    console.log("toolbar is off");
  }
}
