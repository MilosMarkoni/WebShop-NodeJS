const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const loginController = require("../controllers/loginController");

router.post("/login", loginController.login).post("/logout", auth, loginController.logout);

module.exports = router;
