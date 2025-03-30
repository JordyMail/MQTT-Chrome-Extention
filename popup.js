document.getElementById("connect").addEventListener("click", function() {
    let broker = document.getElementById("broker").value;
    chrome.runtime.sendMessage({ action: "connect", broker: broker });
});

document.getElementById("publish").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    let message = document.getElementById("message").value;
    chrome.runtime.sendMessage({ action: "publish", topic: topic, message: message });
});

document.getElementById("subscribe").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    chrome.runtime.sendMessage({ action: "subscribe", topic: topic });
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "messageReceived") {
        let msgList = document.getElementById("messages");
        let listItem = document.createElement("li");
        listItem.textContent = `Topic: ${request.topic}, Message: ${request.message}`;
        msgList.appendChild(listItem);
    }
});
