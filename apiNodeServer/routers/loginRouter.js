const express = require("express");
const loginBL = require("../services/loginBL");
const router = express.Router();

router.route("/").post(async (req, res) => {
	try {
		let { userName, password } = req.body;
		let tokenObj = await loginBL.login(userName, password);
		if (tokenObj) {
			res.cookie("webapp_token", tokenObj.token, { maxAge: 86400000 });
			res.status(200).send({
				_id: tokenObj._id,
				fullName: tokenObj.fullUsername,
				token: tokenObj.token,
			});
		} else {
			throw new Error("Username or password is incorrect");
		}
	} catch (err) {
		res.status(401).send(err.message);
	}
});
module.exports = router;
