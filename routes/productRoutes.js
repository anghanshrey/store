const express = require("express");
const router = express.Router();

const {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
  searchByBarcode
} = require("../controllers/productController");

const { verifyToken } = require("../middleware/authmiddleware");


router.post("/create-product", verifyToken, createProduct);

router.get("/my-products", verifyToken, getMyProducts);

router.put("/update-product/:id", verifyToken, updateProduct);

router.delete("/delete-product/:id", verifyToken, deleteProduct);

router.get("/search/:barcode", verifyToken, searchByBarcode);


module.exports = router;