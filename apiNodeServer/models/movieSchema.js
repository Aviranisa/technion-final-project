const mongoose = require("mongoose");

let movieSchema = new mongoose.Schema({
	name: String,
	yearPremiered: Number,
	genres: [String],
	image: String,
});

module.exports = mongoose.model("movies", movieSchema);
