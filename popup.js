document.addEventListener("DOMContentLoaded", function () {
    const status = document.getElementById("status");
    const brokerInput = document.getElementById("broker");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const topicInput = document.getElementById("topic");
    const connectButton = document.getElementById("connect");
    const onButton = document.getElementById("on");
    const offButton = document.getElementById("off");
    const subscribeButton = document.getElementById("subscribe");
    const messagesList = document.getElementById("messages");
    
    let client = null;

    // Load settings
    chrome.storage.local.get(["bgColor", "defaultTopic"], function(data) {
        if (data.bgColor) {
            document.body.style.backgroundColor = data.bgColor;
            document.body.style.color = data.bgColor === "black" ? "white" : "black";
        }
        if (data.defaultTopic) {
            topicInput.value = data.defaultTopic;
        }
    });

    connectButton.addEventListener("click", function () {
        if (client && client.isConnected()) {
            client.end();
            status.textContent = "Disconnected";
            status.classList.add("text-danger");
            status.classList.remove("text-success");
            return;
        }

        client = mqtt.connect(brokerInput.value, {
            username: usernameInput.value,
            password: passwordInput.value
        });

        client.on("connect", function () {
            status.textContent = "Connected";
            status.classList.add("text-success");
            status.classList.remove("text-danger");
        });

        client.on("message", function (topic, message) {
            let li = document.createElement("li");
            li.textContent = `(${topic}) ${message.toString()}`;
            li.classList.add("list-group-item");
            messagesList.appendChild(li);
        });
    });

    subscribeButton.addEventListener("click", function () {
        if (client && client.isConnected() && topicInput.value) {
            client.subscribe(topicInput.value);
        }
    });

    onButton.addEventListener("click", function () {
        if (client && client.isConnected() && topicInput.value) {
            client.publish(topicInput.value, "ON");
        }
    });

    offButton.addEventListener("click", function () {
        if (client && client.isConnected() && topicInput.value) {
            client.publish(topicInput.value, "OFF");
        }
    });
});
