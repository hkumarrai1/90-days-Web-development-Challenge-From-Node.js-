const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/user/:id", (req, res, next) => {
  const userId = req.params.id;

  if (!userId || userId.length !== 8) {
    const error = new Error("Invalid user ID"); // Create a generic error
    error.statusCode = 400; // Add a custom status code
    throw error; // Throw the error
  }

  const user = getUserFromDatabase(userId);

  if (!user) {
    const error = new Error("User not found"); // Create a generic error
    error.statusCode = 404; // Add a custom status code
    return next(error); // Pass the error to the error-handling middleware
  }

  res.json(user);
});

// Simulated function to get user data
function getUserFromDatabase(userId) {
  const users = {
    12345678: { id: "12345678", name: "John Doe" },
  };
  return users[userId] || null;
}

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace

  const statusCode = err.statusCode || 500; // Use the custom status code or default to 500
  const message = err.message || "Internal Server Error"; // Use the error message or a generic one

  res.status(statusCode).json({
    success: false,
    message: message,
    error: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace in development
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
