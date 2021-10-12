const mongoose = require("mongoose");

let subscribeSchema = new mongoose.Schema({
	movieID: String,
	memberID: String,
	date: Date,
});

module.exports = mongoose.model("subscription", subscribeSchema);
