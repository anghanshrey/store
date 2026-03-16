const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

  productName: {
    type: String,
    required: true
  },

  barcodeNumber: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  dukan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Dukan",
    required: true
  }

}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);