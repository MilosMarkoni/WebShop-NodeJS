const Purchase = require("../models/purchaseModel");
const { prepareQuery } = require("../utils/utils");

const getPurchase = async (req, res) => {
	try {
		const query = prepareQuery(req.query);

		const purchases = await Purchase.find({
			userName: query.filter.userName,
			productId: query.filter.productId,
			purchaseDate: {
				$gte: query.filter.dateFrom,
				$lte: query.filter.dateTo,
			},
		})
			.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
			.limit(query.perPage || 10);

		res.send(purchases);
	} catch (error) {
		res.status(500).send(error);
	}
};
const setPurchase = async (req, res) => {
	try {
		const purchase = new Purchase(req.body);
		await purchase.save();

		res.status(201).send({
			data: {
				message: "Purchase successfully made.",
			},
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getPurchase,
	setPurchase,
};
