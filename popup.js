document.getElementById("saveSettings").addEventListener("click", function() {
    let bgColor = document.getElementById("bgColor").value;
    let textColor = bgColor === "black" ? "white" : "black";
    let autoClear = document.getElementById("autoClear").checked;
    let defaultTopic = document.getElementById("defaultTopic").value;
    let autoReconnect = document.getElementById("autoReconnect").checked;
    
    document.body.style.backgroundColor = bgColor;
    document.body.style.color = textColor;
    chrome.storage.local.set({ bgColor, autoClear, defaultTopic, autoReconnect });
});

chrome.storage.local.get(["bgColor", "autoClear", "defaultTopic", "autoReconnect"], function(data) {
    if (data.bgColor) {
        document.body.style.backgroundColor = data.bgColor;
        document.body.style.color = data.bgColor === "black" ? "white" : "black";
        document.getElementById("bgColor").value = data.bgColor;
    }
    if (data.autoClear !== undefined) {
        document.getElementById("autoClear").checked = data.autoClear;
    }
    if (data.defaultTopic) {
        document.getElementById("topic").value = data.defaultTopic;
        document.getElementById("defaultTopic").value = data.defaultTopic;
    }
    if (data.autoReconnect !== undefined) {
        document.getElementById("autoReconnect").checked = data.autoReconnect;
    }
});

document.getElementById("settingsButton").addEventListener("click", function() {
    document.getElementById("settingsPanel").classList.toggle("hidden");
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "messageReceived") {
        let msgList = document.getElementById("messages");
        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `Topic: ${request.topic}, Message: ${request.message}`;
        msgList.appendChild(listItem);
        
        chrome.storage.local.get(["autoClear"], function(data) {
            if (data.autoClear) {
                setTimeout(() => { msgList.innerHTML = ""; }, 5000);
            }
        });
    }
    if (request.action === "statusUpdate") {
        let statusEl = document.getElementById("status");
        statusEl.textContent = request.status;
        statusEl.className = request.status === "Connected" ? "text-success" : "text-danger";
    }
});
