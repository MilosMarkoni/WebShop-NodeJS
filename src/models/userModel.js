const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	status: {
		type: String,
		required: true,
		trim: true,
		uppercase: true,
	},
	roles: {
		type: String,
		required: true,
		trim: true,
	},
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

userSchema.pre("save", async function(next) {
	const user = this;

	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 8);
	}

	next();
});

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = jwt.sign({ _id: user._id.toString() }, "webshopsecret");

	user.tokens = user.tokens.concat({ token: token });

	await user.save();

	return token;
};

userSchema.statics.findByCredentials = async (userName, password) => {
	const user = await User.findOne({ userName });

	if (!user) {
		throw new Error("No user found!");
	}

	const isMatch = await bcrypt.compare(password, user.password);

	if (!isMatch) {
		throw new Error("Unable to login!");
	}

	return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
