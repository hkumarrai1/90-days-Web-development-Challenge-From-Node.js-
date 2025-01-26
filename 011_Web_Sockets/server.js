const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
  console.log("A new client connected!");

  ws.send("Hello from the WebSocket server!");

  ws.on("message", (message) => {
    console.log("Received: %s", message);
  });
});
