const movieModel = require("../models/movieSchema");

function getAllMovies() {
	return new Promise(function (resolve, reject) {
		movieModel.find({}, function (err, movies) {
			err ? reject(err) : resolve(movies);
		});
	});
}
function getMovie(id) {
	return new Promise(function (resolve, reject) {
		movieModel.findById(id, function (err, movies) {
			err ? reject(err) : resolve(movies);
		});
	});
}

function addNewMovie(movie) {
	return new Promise((resolve, reject) => {
		let newMovie = new movieModel(movie);
		newMovie.save(function (err, movie) {
			err ? reject(err) : resolve(movie);
		});
	});
}

function editMovie(movieID, movieObj) {
	return new Promise(function (resolve, reject) {
		movieModel.findByIdAndUpdate(movieID, movieObj, function (err, movie) {
			err ? reject(err) : resolve(movie);
		});
	});
}

function deleteMovie(movieID) {
	return new Promise(function (resolve, reject) {
		movieModel.findByIdAndDelete(movieID, function (err) {
			err ? reject(err) : resolve("delete!");
		});
	});
}
module.exports = {
	getAllMovies,
	addNewMovie,
	deleteMovie,
	editMovie,
	getMovie,
};
