const express = require("express");
const router = express.Router();
const authBL = require("../services/authenticatedBL");

router.route("/").post(async (req, res) => {
	res.status(200).send(req.userDetails);
});
module.exports = router;
