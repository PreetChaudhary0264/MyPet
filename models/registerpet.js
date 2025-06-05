const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // references the user who owns the pet
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  breed: {
    type: String,
    required: true,
    trim: true,
  },
  age: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profilePhoto: {
    type: String, // URL or file path
    default: "",
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("Pet", petSchema);

