const express = require("express");
const app = express();

app.get("/search", (req, res) => {
  const { text, sort } = req.query;
  res.send(`your text is ${text} and its sorted in format ${sort}`);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
