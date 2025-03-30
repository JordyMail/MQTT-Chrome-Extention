importScripts('https://unpkg.com/mqtt/dist/mqtt.min.js');

let client;

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "connect") {
        client = mqtt.connect(request.broker);
        client.on("connect", () => {
            console.log("Connected to MQTT broker");
            chrome.runtime.sendMessage({ action: "statusUpdate", status: "Connected" });
        });
        client.on("disconnect", () => {
            console.log("Disconnected from MQTT broker");
            chrome.runtime.sendMessage({ action: "statusUpdate", status: "Disconnected" });
        });
    }
    if (request.action === "publish" && client) {
        client.publish(request.topic, request.message);
    }
    if (request.action === "subscribe" && client) {
        client.subscribe(request.topic, (err) => {
            if (!err) console.log(`Subscribed to ${request.topic}`);
        });
    }
});

if (client) {
    client.on("message", (topic, message) => {
        chrome.runtime.sendMessage({ action: "messageReceived", topic: topic, message: message.toString() });
    });
}
