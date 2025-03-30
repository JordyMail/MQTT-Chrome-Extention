function saveSettings() {
    let broker = document.getElementById("broker").value;
    let topic = document.getElementById("topic").value;
    chrome.storage.local.set({ broker, topic });
}

document.getElementById("connect").addEventListener("click", function() {
    let broker = document.getElementById("broker").value;
    chrome.runtime.sendMessage({ action: "connect", broker: broker });
    saveSettings();
});

document.getElementById("publish").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    let message = document.getElementById("message").value;
    chrome.runtime.sendMessage({ action: "publish", topic: topic, message: message });
    saveSettings();
});

document.getElementById("subscribe").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    chrome.runtime.sendMessage({ action: "subscribe", topic: topic });
    saveSettings();
});

chrome.storage.local.get(["broker", "topic"], function(data) {
    if (data.broker) document.getElementById("broker").value = data.broker;
    if (data.topic) document.getElementById("topic").value = data.topic;
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "messageReceived") {
        let msgList = document.getElementById("messages");
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `Topic: ${request.topic}, Message: ${request.message}`;
        msgList.appendChild(listItem);
        chrome.storage.local.get("messages", function(data) {
            let messages = data.messages || [];
            messages.push({ topic: request.topic, message: request.message });
            chrome.storage.local.set({ messages });
        });
    }
    if (request.action === "statusUpdate") {
        let statusEl = document.getElementById("status");
        statusEl.textContent = request.status;
        statusEl.className = request.status === "Connected" ? "text-success" : "text-danger";
    }
});

chrome.storage.local.get("messages", function(data) {
    let messages = data.messages || [];
    let msgList = document.getElementById("messages");
    messages.forEach(msg => {
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `Topic: ${msg.topic}, Message: ${msg.message}`;
        msgList.appendChild(listItem);
    });
});
