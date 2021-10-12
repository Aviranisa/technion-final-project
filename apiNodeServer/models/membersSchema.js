const mongoose = require("mongoose");

let memberSchema = new mongoose.Schema({
	fullName: String,
	email: String,
	city: String,
});

module.exports = mongoose.model("members", memberSchema);
