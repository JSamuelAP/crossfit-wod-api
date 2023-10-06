const crypto = require("node:crypto");

const Member = require("../database/Member");
const { getCurrentDateTime, hashPassword } = require("../database/utils");

const getAllMembers = (filterParams, paginationParams) => {
	try {
		const allMembers = Member.getAllMembers(filterParams, paginationParams);
		return allMembers;
	} catch (error) {
		throw error;
	}
};

const getOneMember = (memberId) => {
	try {
		const member = Member.getOneMember(memberId);
		return member;
	} catch (error) {
		throw error;
	}
};

const createNewMember = (newMember) => {
	const memberToInsert = {
		id: crypto.randomUUID(),
		...newMember,
		password: hashPassword(newMember.password),
		createdAt: getCurrentDateTime(),
		updatedAt: getCurrentDateTime(),
	};

	try {
		const createdMember = Member.createNewMember(memberToInsert);
		return createdMember;
	} catch (error) {
		throw error;
	}
};

const updateOneMember = (memberId, changes) => {
	try {
		const updatedMember = Member.updateOneMember(memberId, changes);
		return updatedMember;
	} catch (error) {
		throw error;
	}
};

const deleteOneMember = (memberId) => {
	try {
		Member.deleteOneMember(memberId);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
};
