const User = require("../models/userModel");

const login = async (req, res) => {
	try {
		const user = await User.findByCredentials(req.body.userName, req.body.password);
		const token = await user.generateAuthToken();
		res.send({ data: { token, message: "Token is successfully created.", code: 200 } });
	} catch (error) {
		res.status(403).send();
	}
};

const logout = async (req, res) => {
	try {
		req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
		await req.user.save();

		res.send();
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	login,
	logout,
};
