const { Router } = require("express");
const express = require("express");
const membersBL = require("../services/membersBL");
const router = express.Router();

router.route("/").get(async (req, res) => {
	try {
		let members = await membersBL.getAllMembers();
		if (!members) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(members);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/:id").get(async (req, res) => {
	try {
		let member = await membersBL.getMember(req.params.id);
		if (!member) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(member);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/").post(async (req, res) => {
	try {
		let newMember = await membersBL.addNewMember(req.body);
		if (!newMember) {
			throw new Error("something went wrong.");
		} else {
			res.status(200).send(newMember);
		}
	} catch (err) {
		res.status(500).send(err.message);
	}
});

router.route("/:id").put(async (req, res) => {
	try {
		let MovieToEdit = await membersBL.editMember(req.params.id, req.body);
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
		let MovieToDelete = await membersBL.deleteMember(req.params.id);
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
