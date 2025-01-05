const express = require("express");
const app = express();
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("hello world this is my first express application");
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
