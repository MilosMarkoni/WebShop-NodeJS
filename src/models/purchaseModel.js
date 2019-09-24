const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	productId: {
		type: Number,
		required: true,
	},
	purchaseDate: {
		type: Date,
		required: true,
	},
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
