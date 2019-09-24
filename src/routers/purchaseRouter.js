const express = require("express");
const router = express.Router();

const purchaseController = require("../controllers/purchaseController");

router.get("/", purchaseController.getPurchase).post("/", purchaseController.setPurchase);

module.exports = router;
