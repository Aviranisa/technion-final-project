const subscriptionModel = require("../models/subscriptionSchema");
const getMovie = require("../services/moviesBL").getMovie;
const getMember = require("../services/membersBL").getMember;

// async function getAllSubscriptions() {
// 	let allSubscriptions = await subscriptionModel.find({});
// 	allSubscriptions.forEach(async (sub) => {
// 		sub.movieData = await getMovie(sub.movieID);
// 		sub.memberData = await getMember(allSubscriptions[i].memberID);
// 	});
// 	return allSubscriptions;
// }

async function getAllSubscriptions() {
	return await subscriptionModel.find({});
}

async function getMemberSubscription(memberID) {
	return await subscriptionModel.find({ memberID });
}

async function getMovieSubscriptions(movieID) {
	return await subscriptionModel.find({ movieID });
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

function editSubscription(subscriptionID, subscriptionObj) {
	return new Promise(function (resolve, reject) {
		subscriptionModel.findByIdAndUpdate(
			subscriptionID,
			subscriptionObj,
			function (err, subscription) {
				err ? reject(err) : resolve(subscription);
			}
		);
	});
}

function deleteSubscription(subscriptionID) {
	return new Promise(function (resolve, reject) {
		subscriptionModel.findByIdAndDelete(subscriptionID, function (err) {
			err ? reject(err) : resolve("deleted!");
		});
	});
}

module.exports = {
	getAllSubscriptions,
	getSubscription,
	addNewSubscription,
	editSubscription,
	deleteSubscription,
	getMemberSubscription,
	getMovieSubscriptions,
};
