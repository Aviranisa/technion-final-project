const authBL = require("./authenticatedBL.js");
const userSchema = require("../models/userSchema");

async function login(userName, Password) {
	let userDetails = await userSchema.findOne({
		userName,
		Password,
	});
	if (userDetails.userName == userName && userDetails.password === Password) {
		let token = await authBL.sign(userDetails);
		return {
			token: token,
			_id: userDetails._id,
			fullUsername: userDetails.fullName,
		};
	}
}
module.exports = { login };
