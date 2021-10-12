const express = require("express");
const router = express.Router();
const authBL = require("../services/authenticatedBL");

// router.post("/", async function (req, res) {
// 	authBL.verify(req, res);
// 	return res.status(200).send(req.id, req.cookies);
// });

router.route("/").post(async (req, res) => {
	res.status(200).send(req.userDetails);
});
module.exports = router;
