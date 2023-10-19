import recordService from "../services/recordService.js";

const getRecordsForWorkout = (req, res) => {
	try {
		const records = recordService.getRecordsForWorkout(req.params.workoutId);
		res.json({ status: "OK", data: records });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getRecordsForMember = (req, res) => {
	try {
		const records = recordService.getRecordsForMember(req.params.memberId);
		res.json({ status: "OK", data: records });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getAllRecords = (req, res) => {
	const { length, page, sort } = req.query;
	try {
		const allRecords = recordService.getAllRecords({ length, page }, { sort });
		res.json({ status: "OK", data: allRecords });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneRecord = (req, res) => {
	try {
		const record = recordService.getOneRecord(req.params.recordId);
		res.json({ status: "OK", data: record });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewRecord = (req, res) => {
	const { workout, record, member } = req.body;
	const newRecord = {
		workout,
		record,
		member,
	};

	try {
		const createdRecord = recordService.createNewRecord(newRecord);
		res.status(201).json({ status: "OK", data: createdRecord });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneRecord = (req, res) => {
	const allowedProperties = ["record", "workout", "member"];
	const changes = {};

	for (const prop of allowedProperties)
		if (req.body.hasOwnProperty(prop)) changes[prop] = req.body[prop];

	try {
		const updatedRecord = recordService.updateOneRecord(
			req.params.recordId,
			changes
		);
		res.json({ status: "OK", data: updatedRecord });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneRecord = (req, res) => {
	try {
		recordService.deleteOneRecord(req.params.recordId);
		res.json({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

export {
	getRecordsForWorkout,
	getRecordsForMember,
	getAllRecords,
	getOneRecord,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
};
