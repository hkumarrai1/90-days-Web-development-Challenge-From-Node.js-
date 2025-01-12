const express = require("express");
const app = express();

// Some routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/error", (req, res) => {
  throw new Error("Something went wrong!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message); // Log the error
  res.status(500).send({ message: "Internal Server Error" }); // Send a generic error response
});

app.get("/bad-request", (req, res) => {
  const error = new Error("Bad Request");
  error.status = 400; // Set status code
  throw error; // Throw error to be caught by middleware
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(err.status || 500)
    .send({ message: err.message || "Internal Server Error" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
