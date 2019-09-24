const dbConnection = require("../db/mongodb").get;
const { getCategoryCounter, incrementCategoryCounter } = require("../controllers/counterController");
const { prepareQuery } = require("../utils/utils");

const getAllCategories = async (req, res) => {
	try {
		const categories = await dbConnection()
			.collection("Category")
			.find({})
			.toArray();

		res.send(categories);
	} catch (error) {
		res.status(500).send();
	}
};

const getCategory = async (req, res) => {
	try {
		const query = prepareQuery(req.query);

		const response = await dbConnection()
			.collection("Category")
			.find(query.filter)
			.toArray();

		res.send(response);
	} catch (error) {
		res.status(500).send();
	}
};

const setCategory = async (req, res) => {
	try {
		const counter = await getCategoryCounter();

		const response = {
			name: req.body.name,
			description: req.body.description,
			_id: counter.id,
		};

		await dbConnection()
			.collection("Category")
			.insertOne(response);

		res.status(201).send({
			data: {
				message: "Category successfully stored into database.",
			},
			resource: [
				{
					name: response.name,
					description: response.description,
					_id: response._id,
				},
			],
		});

		incrementCategoryCounter();
	} catch (error) {
		res.status(500).send();
	}
};

const deleteCategory = async (req, res) => {
	try {
		await dbConnection()
			.collection("category")
			.findOneAndDelete({ _id: Number(req.params.id) });

		res.status(204).send();
	} catch (error) {
		res.status(500).send();
	}
};

module.exports = {
	getAllCategories,
	getCategory,
	setCategory,
	deleteCategory,
};
