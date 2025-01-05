const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  codeId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0, // Ensure age is a positive number
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
