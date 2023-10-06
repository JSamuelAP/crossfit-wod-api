const Record = require("../database/Record");

const { getCurrentDateTime } = require("../database/utils");

const getRecordsForWorkout = (workoutId) => {
	try {
		const record = Record.getRecordsForWorkout(workoutId);
		return record;
	} catch (error) {
		throw error;
	}
};

const getRecordsForMember = (memberId) => {
	try {
		const record = Record.getRecordsForMember(memberId);
		return record;
	} catch (error) {
		throw error;
	}
};

const getAllRecords = (paginationParams) => {
	try {
		const allRecords = Record.getAllRecords(paginationParams);
		return allRecords;
	} catch (error) {
		throw error;
	}
};

const getOneRecord = (recordId) => {
	try {
		const record = Record.getOneRecord(recordId);
		return record;
	} catch (error) {
		throw error;
	}
};

const createNewRecord = (newRecord) => {
	const recordToInsert = {
		id: crypto.randomUUID(),
		...newRecord,
		createdAt: getCurrentDateTime(),
		updatedAt: getCurrentDateTime(),
	};

	try {
		const createdRecord = Record.createNewRecord(recordToInsert);
		return createdRecord;
	} catch (error) {
		throw error;
	}
};

const updateOneRecord = (recordId, changes) => {
	try {
		const updatedRecord = Record.updateOneRecord(recordId, changes);
		return updatedRecord;
	} catch (error) {
		throw error;
	}
};

const deleteOneRecord = (recordId) => {
	try {
		Record.deleteOneRecord(recordId);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getRecordsForWorkout,
	getRecordsForMember,
	getAllRecords,
	getOneRecord,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
};
