const Product = require("../models/Product");


// CREATE PRODUCT
exports.createProduct = async (req, res) => {

  try {

    const { productName, barcodeNumber, price } = req.body;

    const product = new Product({
      productName,
      barcodeNumber,
      price,
      dukan: req.user.id   // logged-in dukan
    });

    await product.save();

    res.status(201).json({
      message: "Product created successfully"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


// GET PRODUCTS OF LOGGED DUKAN
exports.getMyProducts = async (req, res) => {

  try {

    const products = await Product
      .find({ dukan: req.user.id })
      .select("-dukan");   // hide dukan field

    res.status(200).json(products);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};


exports.updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const { productName, barcodeNumber, price } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: id, dukan: req.user.id }, // ensure same dukan
      { productName, barcodeNumber, price },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product updated",
      product
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.deleteProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const product = await Product.findOneAndDelete({
      _id: id,
      dukan: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted"
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

exports.searchByBarcode = async (req, res) => {

  try {

    const { barcode } = req.params;

    const product = await Product.findOne({
      barcodeNumber: barcode,
      dukan: req.user.id
    }).select("-dukan");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};