function saveSettings() {
    let broker = document.getElementById("broker").value;
    let topic = document.getElementById("topic").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    chrome.storage.local.set({ broker, topic, username, password });
}

document.getElementById("connect").addEventListener("click", function() {
    let broker = document.getElementById("broker").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    chrome.runtime.sendMessage({ action: "connect", broker, username, password });
    saveSettings();
});

document.getElementById("on").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    chrome.runtime.sendMessage({ action: "publish", topic, message: "ON" });
});

document.getElementById("off").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    chrome.runtime.sendMessage({ action: "publish", topic, message: "OFF" });
});

document.getElementById("subscribe").addEventListener("click", function() {
    let topic = document.getElementById("topic").value;
    chrome.runtime.sendMessage({ action: "subscribe", topic });
    saveSettings();
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "messageReceived") {
        let msgList = document.getElementById("messages");
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `Topic: ${request.topic}, Message: ${request.message}`;
        msgList.appendChild(listItem);
    }
    if (request.action === "statusUpdate") {
        let statusEl = document.getElementById("status");
        statusEl.textContent = request.status;
        statusEl.className = request.status === "Connected" ? "text-success" : "text-danger";
    }
});
