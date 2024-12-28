const http = require("http");

const server = http.createServer((req, res) => {
  res.setHeader(`Content-Type`, `text/html`);
  if (req.url === `/`) {
    res.write(`<h1>Welcome to the homepage</h1>`);
  } else if (req.url === `/about`) {
    res.write(`<h1>Welcome to the About Section</h1>`);
  } else {
    res.write(`<h1>Error 404</h1><p>the requested page is not found</p>`);
  }
  res.end();
});

server.listen(3000, () => {
  console.log(`server is running on http://localhost:3000/`);
});
