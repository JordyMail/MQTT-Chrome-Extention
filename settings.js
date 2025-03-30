document.getElementById("saveSettings").addEventListener("click", function() {
    let bgColor = document.getElementById("bgColor").value;
    let fontSize = document.getElementById("fontSize").value;
    let notificationSound = document.getElementById("notificationSound").checked;
    let customCommands = document.getElementById("customCommands").value;
    let buttonColor = document.getElementById("buttonColor").value;
    let defaultTopic = document.getElementById("defaultTopic").value;
    let autoReconnect = document.getElementById("autoReconnect").checked;
    
    chrome.storage.local.set({ bgColor, fontSize, notificationSound, customCommands, buttonColor, defaultTopic, autoReconnect });
});

chrome.storage.local.get(["bgColor", "fontSize", "notificationSound", "customCommands", "buttonColor", "defaultTopic", "autoReconnect"], function(data) {
    if (data.bgColor) {
        document.getElementById("bgColor").value = data.bgColor;
    }
    if (data.fontSize) {
        document.getElementById("fontSize").value = data.fontSize;
    }
    if (data.notificationSound !== undefined) {
        document.getElementById("notificationSound").checked = data.notificationSound;
    }
    if (data.customCommands) {
        document.getElementById("customCommands").value = data.customCommands;
    }
    if (data.buttonColor) {
        document.getElementById("buttonColor").value = data.buttonColor;
    }
    if (data.defaultTopic) {
        document.getElementById("defaultTopic").value = data.defaultTopic;
    }
    if (data.autoReconnect !== undefined) {
        document.getElementById("autoReconnect").checked = data.autoReconnect;
    }
});
