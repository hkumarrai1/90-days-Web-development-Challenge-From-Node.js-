const express = require("express");
const app = express();

app.get("/user/:actionId/:item", (req, res) => {
  const { actionId, item } = req.params;
  console.log(`Your action ID is ${actionId} and your item is ${item}`);
  res.send(`Your action ID is ${actionId} and your item is ${item}`);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
