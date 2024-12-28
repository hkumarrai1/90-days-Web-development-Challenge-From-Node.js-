const http = require("http");
const url = require("url");
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const query = parsedUrl.query;
  res.setHeader(`Content-Type`, `text/html`);

  if (parsedUrl.pathname === `/search`) {
    res.write(`this is the ${query.query}`);
  }
  res.end();
});
server.listen(5000, () => {
  console.log(`server is running on http://localhost:5000/`);
});
