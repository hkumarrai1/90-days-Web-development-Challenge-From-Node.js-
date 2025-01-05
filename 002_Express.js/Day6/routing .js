const express = require("express");
const app = express();

const PORT = 3000;
app.get("/", (req, res) => {
  res.send("Hello,Welcome to the website");
});
app.get("/contact", (req, res) => {
  res.send("Hello,Welcome to the contact website");
});
app.get("/about", (req, res) => {
  res.send("Hello,Welcome to the about section");
});
app.use((req, res) => {
  res.status(404).send("website not find");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
