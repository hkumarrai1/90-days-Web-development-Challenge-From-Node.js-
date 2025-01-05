const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  TMID: {
    type: String,
    required: true,
    unique: true,
  },
  TN: {
    type: String,
    required: true,
    trim: true,
  },
  DueDate: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  Priority: {
    type: String,
    enum: ["High", "Medium", "Low"],
    default: "Medium",
  },
  Description: {
    type: String,
    trim: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
