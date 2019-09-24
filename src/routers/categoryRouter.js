const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/categoryController");

router
	.get("/all", categoryController.getAllCategories)
	.get("/", categoryController.getCategory)
	.post("/", categoryController.setCategory)
	.delete("/:id", categoryController.deleteCategory);

module.exports = router;
