const express = require("express");
const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");
const data = {
  message: "Hello world",
  title: "Hello World Programming",
  items: ["Item 1", "Item 2", "Item 3", "Item 4"],
  user: null,
};

// Serve a route to render the index.ejs file
app.get("/", (req, res) => {
  res.render("index", data);
  console.log(require.resolve("ejs"));
});

// Define a port
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
