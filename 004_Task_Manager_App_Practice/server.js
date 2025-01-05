const connectDb = require("./db");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Task = require("./schema");

app.use(express.json());

app.use("/", (req, res, next) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${time} ${req.method} requested by ${req.url}`);
  next();
});
app.post("/user", async (req, res) => {
  const { TMID, TN, DueDate, Status, Priority, Description, CreatedAt } =
    req.body;
  const newTask = new Task({
    TMID: TMID,
    TN: TN,
    DueDate: DueDate,
    Status: Status,
    Priority: Priority,
    Description: Description,
  });
  try {
    const savedTask = await newTask.save();
    res
      .status(201)
      .json({ message: "Task created successfully!", task: savedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating task", error: error.message });
  }
});
app.get("/user", async (req, res) => {
  const { TMID } = req.query;

  try {
    const getDetail = await Task.find({ TMID: TMID });

    if (getDetail.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Your Task Details Are", Details: getDetail });
  } catch (error) {
    res.status(500).json({ message: "Error happened", error: error.message });
  }
});

app.put("/user", async (req, res) => {
  const { TMID, TN, DueDate, Status, Priority, Description } = req.body;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { TMID: TMID },
      {
        TN: TN,
        DueDate: DueDate,
        Status: Status,
        Priority: Priority,
        Description: Description,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task Updated", Data: updatedTask });
  } catch (error) {
    res.status(500).json({ message: "Error Updating", error: error.message });
  }
});
app.delete("/user/:TMID", async (req, res) => {
  const { TMID } = req.params;

  try {
    const deletedTask = await Task.findOneAndDelete({ TMID: TMID });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res
      .status(200)
      .json({ message: "Task deleted successfully", task: deletedTask });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting task", error: error.message });
  }
});
const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected successfully!");

    await app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
