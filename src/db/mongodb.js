const { MongoClient } = require("mongodb");
var storedDbConnection;

const connect = callback => {
	if (storedDbConnection === undefined) {
		MongoClient.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true }, function(err, client) {
			if (err) {
				throw new Error(err);
			}

			storedDbConnection = client.db("web-shop");

			// Add counters if they don't exist
			storedDbConnection
				.collection("counters")
				.find()
				.toArray((err, res) => {
					if (!res.length) {
						storedDbConnection.collection("counters").insertMany([{ name: "productCounter", id: 0 }, { name: "categoryCounter", id: 0 }]);
					}
				});

			callback();
		});
	} else {
		callback();
	}
};

const get = () => storedDbConnection;

module.exports = { connect, get };
