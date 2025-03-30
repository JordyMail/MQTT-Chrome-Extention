// popup.js
document.getElementById("connect").addEventListener("click", function() {
    let broker = document.getElementById("broker").value;
    chrome.runtime.sendMessage({ action: "connect", broker: broker });
});

document.getElementById("publish").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    let message = document.getElementById("message").value;
    chrome.runtime.sendMessage({ action: "publish", topic: topic, message: message });
});
