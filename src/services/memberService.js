import crypto from "node:crypto";

import Member from "../database/Member.js";
import { getCurrentDateTime, hashPassword } from "../database/utils.js";

const getAllMembers = (filterParams, paginationParams, sortingParams) => {
	try {
		const allMembers = Member.getAllMembers(
			filterParams,
			paginationParams,
			sortingParams
		);
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
		if (changes.password) changes.password = hashPassword(changes.password);
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

export default {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
};
