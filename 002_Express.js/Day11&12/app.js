const mongoose = require("mongoose");
const connectDb = require("./db");

connectDb();

const userSchema = new mongoose.Schema({
  id: {
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
    min: 1,
  },
});

const User = mongoose.model("User", userSchema);

// Create a new user
const createUser = async (id, name, email, age) => {
  const newUser = new User({
    id: id,
    name: name,
    email: email,
    age: age,
  });
  try {
    await newUser.save();
    console.log("User created successfully:", newUser);
  } catch (error) {
    console.log("Error creating user:", error);
  }
};

// Read all users
const readUsers = async () => {
  try {
    const users = await User.find();
    console.log("Users found:", users);
  } catch (error) {
    console.log("Error reading users:", error);
  }
};

// Update a user by custom `id`
const updateUser = async (id) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id: id }, // Match by custom `id` field
      { age: 35 }, // Update the age field
      { new: true } // Return the updated document
    );
    console.log("Updated user:", updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
// Delete a user by custom `id`
const deleteUser = async (id) => {
  try {
    // Use findOneAndDelete to match by custom `id` field
    const deletedUser = await User.findOneAndDelete({ id: id });
    console.log("Deleted user:", deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Uncomment the function calls below one at a time for testing

deleteUser(1);
