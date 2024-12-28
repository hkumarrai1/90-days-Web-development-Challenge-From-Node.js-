const http = require("http");
const server = http.createServer((req, res) => {
  res.setHeader(`Content-Type`, "text/html");
  res.write(`<h1>Hello World<h1>`);
  res.end(`<p>GoodBye</p>`); //end the server
});
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
