const { Router } = require("express");
const express = require("express");
const moviesBL = require("../services/moviesBL");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		let movies = await moviesBL.getAllMovies();
		if (!movies) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(movies);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let movies = await moviesBL.getMovie(req.params.id);
		if (!movies) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(movies);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/").post(async (req, res) => {
	try {
		let newMovie = await moviesBL.addNewMovie(req.body);
		if (!newMovie) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(newMovie);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/:id").put(async (req, res) => {
	try {
		let MovieToEdit = await moviesBL.editMovie(req.params.id, req.body);
		if (!MovieToEdit) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(MovieToEdit);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/:id").delete(async (req, res) => {
	try {
		let MovieToDelete = await moviesBL.deleteMovie(req.params.id);
		if (!MovieToDelete) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send("deleted!");
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});
module.exports = router;
