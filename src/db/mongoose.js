const mongoose = require("mongoose");

mongoose.connect(process.env.MONGOOSECONNECT, {
	useNewUrlParser: true,
	useCreateIndex: true,
});
