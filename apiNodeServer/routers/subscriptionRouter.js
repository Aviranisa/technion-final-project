const express = require("express");
const subscriptionBL = require("../services/subscriptionBL");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		let subscription = await subscriptionBL.getAllSubscriptions();
		if (!subscription) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(subscription);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/movie/:id").get(async (req, res) => {
	try {
		let movieSubscriptions = await subscriptionBL.getMovieSubscriptions(
			req.params.id
		);
		if (!movieSubscriptions) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(movieSubscriptions);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/member/:id").get(async (req, res) => {
	try {
		let memberSubscriptions = await subscriptionBL.getMemberSubscription(
			req.params.id
		);
		if (!memberSubscriptions) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(memberSubscriptions);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/").post(async (req, res) => {
	try {
		let newSubscription = await subscriptionBL.addNewSubscription(req.body);
		if (!newSubscription) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(newSubscription);
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
