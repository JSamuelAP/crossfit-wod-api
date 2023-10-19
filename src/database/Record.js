import {
	readJSON,
	saveToDatabase,
	getCurrentDateTime,
	getPage,
	sortByDate,
} from "./utils.js";
const DB = readJSON(import.meta.url, "./db.json");

const getRecordsForWorkout = (workoutId) => {
	try {
		const workoutIndex = DB.workouts.findIndex(
			(workout) => workout.id === workoutId
		);
		if (workoutIndex === -1)
			throw {
				status: 404,
				message: `Can't find workout with the id '${workoutId}'`,
			};

		const records = DB.records.filter((record) => record.workout === workoutId);
		return records;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const getRecordsForMember = (memberId) => {
	try {
		const memberIndex = DB.members.findIndex(
			(member) => member.id === memberId
		);
		if (memberIndex === -1)
			throw {
				status: 404,
				message: `Can't find member with the id '${memberId}'`,
			};

		const records = DB.records.filter((record) => record.member === memberId);
		return records;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const getAllRecords = (paginationParams, sortingParams) => {
	try {
		let records = getPage(
			DB.records,
			paginationParams.page,
			paginationParams.length
		);
		if (sortingParams.sort) records = sortByDate(records, sortingParams.sort);

		return records;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneRecord = (recordId) => {
	try {
		const record = DB.records.find((record) => record.id === recordId);
		if (!record)
			throw {
				status: 404,
				message: `Can't find record with the id '${recordId}'`,
			};
		return record;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const createNewRecord = (newRecord) => {
	try {
		const { workout: workoutId, member: memberId } = newRecord;
		const workoutIndex = DB.workouts.findIndex(
			(workout) => workout.id === workoutId
		);
		if (workoutIndex === -1)
			throw {
				status: 400,
				message: `Workout with the id '${workoutId} doesn't exist'`,
			};
		const memberIndex = DB.members.findIndex(
			(member) => member.id === memberId
		);
		if (memberIndex === -1)
			throw {
				status: 404,
				message: `Member with the id '${memberId} doesn't exist'`,
			};

		DB.records.push(newRecord);
		saveToDatabase(DB);
		return newRecord;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const updateOneRecord = (recordId, changes) => {
	try {
		const indexForUpdate = DB.records.findIndex(
			(record) => record.id === recordId
		);
		if (indexForUpdate === -1)
			throw {
				status: 404,
				message: `Can't find record with the id '${recordId}'`,
			};

		const { workout: workoutId, member: memberId } = changes;
		if (workoutId) {
			const workoutIndex = DB.workouts.findIndex(
				(workout) => workout.id === workoutId
			);
			if (workoutIndex === -1)
				throw {
					status: 400,
					message: `Workout with the id '${workoutId} doesn't exist'`,
				};
		}
		if (memberId) {
			const memberIndex = DB.members.findIndex(
				(member) => member.id === memberId
			);
			if (memberIndex === -1)
				throw {
					status: 404,
					message: `Member with the id '${memberId} doesn't exist'`,
				};
		}

		const updatedRecord = {
			...DB.records[indexForUpdate],
			...changes,
			updatedAt: getCurrentDateTime(),
		};
		DB.records[indexForUpdate] = updatedRecord;
		saveToDatabase(DB);
		return updatedRecord;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const deleteOneRecord = (recordId) => {
	try {
		const indexForDeletion = DB.records.findIndex(
			(record) => record.id === recordId
		);
		if (indexForDeletion === -1)
			throw {
				status: 404,
				message: `Can't find record with the id '${recordId}'`,
			};
		DB.records.splice(indexForDeletion, 1);
		saveToDatabase(DB);
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

export default {
	getAllRecords,
	getOneRecord,
	getRecordsForWorkout,
	getRecordsForMember,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
};
