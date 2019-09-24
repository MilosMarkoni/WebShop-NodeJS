const User = require("../models/userModel");
const { prepareQuery } = require("../utils/utils");

const getAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.status(200).send(users);
	} catch (error) {
		res.status(400).send(error);
	}
};

const getUser = async (req, res) => {
	try {
		const query = prepareQuery(req.query);

		const users = await User.find(query.filter)
			.skip((query.pageNum - 1) * (query.perPage || 10) || 0)
			.limit(query.perPage || 10);

		res.status(200).send({ data: users });
	} catch (error) {
		res.status(400).send(error);
	}
};

const setUser = async (req, res) => {
	try {
		const user = new User(req.body);

		await user.save();
		res.status(201).send({
			data: {
				message: "User successfully created!",
			},
		});
	} catch (error) {
		res.status(400).send(error);
	}
};

const updateUser = async (req, res) => {
	try {
		updatedUser = await User.findOneAndUpdate(
			{ userName: req.params.userName },
			{
				email: req.body.email,
				roles: req.body.roles,
				status: req.body.status,
			},
			{ new: true, useFindAndModify: true },
		);

		if (!updatedUser) {
			res.status(404).send();
		}

		res.status(200).send(updatedUser);
	} catch (error) {
		res.status(500).send();
	}
};

const deleteUser = async (req, res) => {
	try {
		await User.deleteOne({ userName: req.params.userName });

		res.status(200).send({
			data: {
				message: "User successfully deleted.",
			},
		});
	} catch (error) {
		res.status(400).send();
	}
};

module.exports = {
	getAllUsers,
	getUser,
	setUser,
	updateUser,
	deleteUser,
};
