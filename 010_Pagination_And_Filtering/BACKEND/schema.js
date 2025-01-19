const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
});
const Stories = mongoose.model("Stories", userSchema);
module.exports = Stories;
