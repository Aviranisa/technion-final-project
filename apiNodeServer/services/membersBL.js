const memberModel = require("../models/membersSchema");

function getAllMembers() {
	return new Promise(function (resolve, reject) {
		memberModel.find({}, function (err, movies) {
			err ? reject(err) : resolve(movies);
		});
	});
}

function getMember(id) {
	return new Promise(function (resolve, reject) {
		memberModel.findById(id, function (err, movies) {
			err ? reject(err) : resolve(movies);
		});
	});
}

function addNewMember(member) {
	return new Promise((resolve, reject) => {
		let newMember = new memberModel(member);
		newMember.save(function (err, member) {
			err ? reject(err) : resolve(member);
		});
	});
}

function editMember(memberID, memberObj) {
	return new Promise(function (resolve, reject) {
		memberModel.findByIdAndUpdate(memberID, memberObj, function (err, member) {
			err ? reject(err) : resolve(member);
		});
	});
}

function deleteMember(memberID) {
	return new Promise(function (resolve, reject) {
		memberModel.findByIdAndDelete(memberID, function (err) {
			err ? reject(err) : resolve("deleted!");
		});
	});
}

module.exports = {
	getAllMembers,
	getMember,
	addNewMember,
	editMember,
	deleteMember,
};
