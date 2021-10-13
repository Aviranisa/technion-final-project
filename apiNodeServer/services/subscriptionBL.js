const subscriptionModel = require("../models/subscriptionSchema");
const getMovie = require("../services/moviesBL").getMovie;
const getMember = require("../services/membersBL").getMember;

async function getAllSubscriptions() {
	return await subscriptionModel.find({});
}

function getSubscription(id) {
	return new Promise(function (resolve, reject) {
		subscriptionModel.findById(id, function (err, subscription) {
			err ? reject(err) : resolve(subscription);
		});
	});
}

function addNewSubscription(subscription) {
	return new Promise((resolve, reject) => {
		let newSubscription = new subscriptionModel(subscription);
		newSubscription.save(function (err, subscription) {
			err ? reject(err) : resolve(subscription);
		});
	});
}
async function getMemberSubscription(memberID) {
	return await subscriptionModel.find({ memberID });
}
module.exports = {
	getAllSubscriptions,
	getSubscription,
	addNewSubscription,
	getMemberSubscription,
};
