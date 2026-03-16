const mongoose = require("mongoose");

const dukanSchema = new mongoose.Schema({

  dukanName: {
    type: String,
    required: true,
    unique: true
  },

  phone: {
    type: String,
    unique: true,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  address: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

}, { timestamps: true });

module.exports = mongoose.model("Dukan", dukanSchema);