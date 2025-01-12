const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/myDatabase");
    console.log("Connection Successful");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
}

module.exports = connectDb;
