const dbConnection = require("../db/mongodb").get;

const incrementProductCounter = () =>
	dbConnection()
		.collection("counters")
		.updateOne({ name: "productCounter" }, { $inc: { id: 1 } });

const incrementCategoryCounter = () =>
	dbConnection()
		.collection("counters")
		.updateOne({ name: "categoryCounter" }, { $inc: { id: 1 } });

const getProductCounter = async () =>
	await dbConnection()
		.collection("counters")
		.findOne({ name: "productCounter" });

const getCategoryCounter = async () =>
	await dbConnection()
		.collection("counters")
		.findOne({ name: "categoryCounter" });

module.exports = { incrementProductCounter, getProductCounter, incrementCategoryCounter, getCategoryCounter };
