const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
	.get("/all", userController.getAllUsers)
	.get("/", userController.getUser)
	.post("/", userController.setUser)
	.put("/:userName", userController.updateUser)
	.delete("/:userName", userController.deleteUser);

module.exports = router;
