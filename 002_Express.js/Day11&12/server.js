const connectDb = require("./db");
const mongoose = require("mongoose");
const express = require("express");
connectDb();
const app = express();

const userSchema = mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 10 },
});
userSchema.method.getDetails = function () {
  return `Id:${this.id} Name:${this.name} Email:${this.email} Age:${this.age}`;
};
userSchema.statics.findEmail = function (email) {
  return this.findOne({ email });
};
const User = mongoose.model("User", userSchema);
app.use(express.json());

app.get("/user/create", async (req, res) => {
  const { id, name, email, age } = req.query;
  const newUser = new User({ id, name, email, age });

  try {
    // Use await to ensure the user is saved before responding
    await newUser.save();
    res
      .status(201)
      .send({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).send({ message: "Error creating user", error });
  }
});

app.get("/user/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Find and delete the user by their `id`
    const deleteUser = await User.findOneAndDelete({ id: id });

    // If no user is found, return a 404 error
    if (!deleteUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send response on successful deletion
    res
      .status(200)
      .send({ message: "User deleted successfully", user: deleteUser });
  } catch (error) {
    // Handle any errors
    res.status(500).send({ message: "Error deleting user", error });
  }
});

app.get("/user/updateUser", async (req, res) => {
  const { id, name, email, age } = req.query; // Extract query parameters

  if (!id) {
    return res.status(400).send({ message: "User ID is required for update." });
  }

  try {
    // Perform the update operation
    const updatedUser = await User.findOneAndUpdate(
      { id: id }, // Search filter
      { name: name, email: email, age: age }, // Fields to update
      { new: true } // Return the updated document
    );

    // If no user is found, handle the case
    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the updated user as a response
    res.status(200).send({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).send({
      message: "Error updating user",
      error: error.message,
    });
  }
});
app.get("/user/readUser", async (req, res) => {
  const { id } = req.query; // Extract id from query parameters

  if (!id) {
    return res
      .status(400)
      .send({ message: "User ID is required to fetch the user." });
  }

  try {
    // Look for a user with the provided id
    const user = await User.findOne({ id: id });

    // If no user is found, return a 404 error
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Send the found user as a response
    res.status(200).send({
      message: "User found successfully",
      user: user,
    });
  } catch (error) {
    // Handle any errors
    res.status(500).send({
      message: "Error retrieving user",
      error: error.message,
    });
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
