const express = require("express");
const app = express();
//Global Middleware
app.use((req, res, next) => {
  const time = new Date().toLocaleString();
  console.log(`${time} ${req.method} request to ${req.url}`);
  next();
});
//route specific Middleware
app.get(
  "/",
  (req, res, next) => {
    console.log("route specific Middleware");
    next();
  },
  (req, res) => {
    res.send("Hello world");
  }
);
app.listen(3000, () => {
  console.log("server is running on http://localhost:3000/");
});
