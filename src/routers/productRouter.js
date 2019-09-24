const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router
	.get("/all", productController.getAllProducts)
	.get("/", productController.getProduct)
	.post("/", productController.setProduct)
	.put("/:id", productController.updateProduct)
	.delete("/:id", productController.deleteProduct);

module.exports = router;
