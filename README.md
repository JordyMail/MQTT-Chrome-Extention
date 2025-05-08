# MQTT Chrome Extension

## Overview
This Chrome extension allows users to control IoT devices using MQTT directly from their browser. Users can connect to an MQTT broker, send messages, subscribe to topics, and customize their settings for a better experience. </br>
<strong> NOTE: I developed this extension because similar solutions are only available for Mac users, while there is no support yet for the Windows platform. </strong>

## Features
- Connect to an MQTT broker with authentication.
- Subscribe to topics and receive real-time messages.
- Send ON/OFF commands to control IoT devices.
- Customizable settings, including:
  - Background color selection
  - Font size adjustment
  - Notification sound for new messages
  - Custom command presets
  - Button color customization
  - Default topic storage
  - Auto-reconnect option

## Installation
1. Clone or download this repository.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable "Developer mode" (toggle switch at the top right).
4. Click "Load unpacked" and select the project folder.
5. The extension will now be available in your browser.

## Usage
1. Click the extension icon to open the MQTT IoT Controller popup.
2. Enter the MQTT broker URL, username, and password.
3. Click "Connect" to establish a connection.
4. Enter a topic and send ON/OFF commands.
5. Subscribe to a topic to receive messages.
6. Adjust settings through the settings menu for a personalized experience.

## Files Structure
- `manifest.json` - Chrome extension configuration.
- `popup.html` - Main UI for the extension.
- `popup.js` - Handles MQTT connection and UI interactions.
- `settings.html` - UI for customizable settings.
- `settings.js` - Script to handle settings management.
- `background.js` - Background script handling service worker operations.

## Technologies Used
- HTML, CSS, JavaScript
- Bootstrap 5 for styling
- Chrome Storage API for saving settings
- MQTT.js for MQTT communication


