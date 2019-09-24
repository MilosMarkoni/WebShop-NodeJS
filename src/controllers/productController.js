const dbConnection = require("../db/mongodb").get;
const { getProductCounter, incrementProductCounter } = require("../controllers/counterController");
const { prepareQuery } = require("../utils/utils");

const getAllProducts = async (req, res) => {
	try {
		const products = await dbConnection()
			.collection("products")
			.find()
			.toArray();

		res.send(products);
	} catch (error) {
		res.status(500).send();
	}
};

const getProduct = async (req, res) => {
	try {
		const query = prepareQuery(req.query);

		const response = await dbConnection()
			.collection("products")
			.aggregate([
				{
					$match: query.filter,
				},
				{
					$lookup: {
						from: "Category",
						localField: "category",
						foreignField: "_id",
						as: "category",
					},
				},
			])
			.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
			.limit(query.perPage || 10)
			.toArray();

		res.send(response);
	} catch (error) {
		res.status(500).send();
	}
};

const setProduct = async (req, res) => {
	try {
		const counter = await getProductCounter();

		const response = {
			name: req.body.name,
			description: req.body.description,
			quantity: Number(req.body.quantity),
			category: req.body.category,
			_id: counter.id,
		};

		await dbConnection()
			.collection("products")
			.insertOne(response);

		res.status(201).send({
			data: {
				message: "Product successfully stored into database.",
			},
			resource: { ...response },
		});

		incrementProductCounter();
	} catch (error) {
		res.status(500).send(error);
	}
};

const updateProduct = async (req, res) => {
	try {
		const response = await dbConnection()
			.collection("products")
			.findOneAndUpdate({ _id: Number(req.params.id) }, { $set: { ...req.body } });

		if (!response.value) {
			res.status(400).send("No product found!");
		}

		res.send({
			data: {
				message: "Product successfully updated in database.",
			},
		});
	} catch (error) {
		res.status(500).send();
	}
};

const deleteProduct = async (req, res) => {
	try {
		await dbConnection()
			.collection("products")
			.findOneAndDelete({ _id: Number(req.params.id) });

		res.status(204).send();
	} catch (error) {
		res.status(500).send();
	}
};

module.exports = {
	getAllProducts,
	getProduct,
	setProduct,
	updateProduct,
	deleteProduct,
};
