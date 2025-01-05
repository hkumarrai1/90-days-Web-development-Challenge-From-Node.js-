const dbConnect = require("./db");
const express = require("express");
const User = require("./User");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send("<h1>Welcome to the REST API</h1>");
});

app.get("/user", async (req, res) => {
  try {
    const Data = await User.find();
    if (Data.length === 0) {
      res.status(404).json({ message: "No data found" });
    } else {
      res.json({ message: "Data fetched successfully", data: Data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/user", async (req, res) => {
  try {
    const { id, name, email, age } = req.body;
    const newUser = new User({
      codeId: id,
      name: name,
      email: email,
      age: age,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/user", async (req, res) => {
  const { codeId, name, email, age } = req.body;
  try {
    const UpdatedUser = await User.findOneAndUpdate(
      { codeId: codeId },
      { name: name, email: email, age: age },
      { new: true }
    );
    if (!UpdatedUser) {
      return res.status(404).json({ message: "User Not Found" });
    }
    res
      .status(200)
      .json({ message: "User Updated Successfully", user: UpdatedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete("/user", async (req, res) => {
  const { codeId } = req.body;
  try {
    const deletedUser = await User.findOneAndDelete({ codeId: codeId });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User Deleted Successfully",
      user: deletedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const startServer = async () => {
  try {
    await dbConnect();
    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000/");
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

startServer();
