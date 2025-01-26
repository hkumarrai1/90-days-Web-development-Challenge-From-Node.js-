const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:8080");

// Event listener for when the connection is open
socket.addEventListener("open", (event) => {
  console.log("Connected to WebSocket server!");

  socket.send("Hello from the WebSocket client!");
});

// Event listener for receiving messages from the server
socket.addEventListener("message", (event) => {
  console.log("Message from server:", event.data);
});
