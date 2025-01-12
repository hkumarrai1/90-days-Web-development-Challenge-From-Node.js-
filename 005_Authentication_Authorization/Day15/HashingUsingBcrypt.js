const mongoose = require("mongoose");
const connectDb = require("./db");
const Details = require("./schema");
const bcrypt = require("bcrypt");
const express = require("express");
const app = express();

app.use(express.json());
const hashPassword = async (password) => {
  const saltRounnds = 10;
  try {
    const hashedpassword = await bcrypt.hash(password, saltRounnds);
    console.log(hashedpassword);
    return hashedpassword;
  } catch (error) {
    console.log({ message: error.message });
  }
};

const matchPassword = async (plainPassword, hashedpassword) => {
  try {
    const match = await bcrypt.compare(plainPassword, hashedpassword);
    if (match) {
      console.log("Password is correct!");
    } else {
      console.log("Password is incorrect!");
    }
    return match;
  } catch (err) {
    console.error("Error verifying password:", err);
  }
};

app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const hashedpassword = await hashPassword(password);
  const newUser = new Details({
    name: name,
    email: email,
    password: hashedpassword,
  });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Happend Creating User", Error: error.message });
  }
});

app.post("/user/logging", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Details.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await matchPassword(password, user.password);
    if (isMatch) {
      res.status(200).json({ message: "User LoggedIn successfully" });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Happed Creating User", Error: error.message });
  }
});
const startServer = async () => {
  try {
    await connectDb();
    console.log("Database connected successfully!");

    app.listen(3000, () => {
      console.log("Server is running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Error starting the server:", error.message);
    process.exit(1);
  }
};

startServer();
