// background.js
importScripts('https://unpkg.com/mqtt/dist/mqtt.min.js');

let client;

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "connect") {
        client = mqtt.connect(request.broker);
        client.on("connect", () => console.log("Connected to MQTT broker"));
    }
    if (request.action === "publish" && client) {
        client.publish(request.topic, request.message);
    }
});
