const jwt = require("jsonwebtoken");
const jwt_secret = "someKey";

async function sign(userDetails) {
	return await jwt.sign(
		{ id: userDetails?._id, fullName: userDetails?.fullName },
		jwt_secret,
		{
			expiresIn: 86400000,
		}
	);
}

async function verify(req, res, next) {
	try {
		let token = req.cookies.webapp_token;
		if (!token) {
			res.status(401).send("Unauthorized");
		}
		let userDetails = await jwt.verify(token, jwt_secret);
		req.userDetails = userDetails;
		next();
	} catch (err) {
		res.status(502).send({ message: err.message });
	}
}

module.exports = { sign, verify };
