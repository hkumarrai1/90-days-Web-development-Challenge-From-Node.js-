const http = require("http");
const server = http.createServer((req, res) => {
  res.write("Hello World");
  res.end(); //end the server
});
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
