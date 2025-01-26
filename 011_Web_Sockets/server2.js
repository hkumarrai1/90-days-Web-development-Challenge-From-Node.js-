const WebSocket = require("ws");

// Create a new WebSocket server that listens on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new WebSocket connections
wss.on("connection", (ws) => {
  console.log("A new client connected!");

  // Send a welcome message to the newly connected client
  ws.send("Welcome to the real-time chat application!");

  // Event listener for incoming messages from clients
  ws.on("message", (message) => {
    console.log("Received: %s", message);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString()); // Send the message to all clients except the sender
      }
    });
  });

  // Event listener for when a client disconnects
  ws.on("close", () => {
    console.log("A client has disconnected!");
  });
});
