const recordService = require("../services/recordService");

const getRecordsForWorkout = (req, res) => {
	const { workoutId } = req.params;
	if (!workoutId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':workoutId' can not be empty",
			},
		});

	try {
		const records = recordService.getRecordsForWorkout(workoutId);
		res.send({ status: "OK", data: records });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getRecordsForMember = (req, res) => {
	const { memberId } = req.params;
	if (!memberId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':memberId' can not be empty",
			},
		});

	try {
		const records = recordService.getRecordsForMember(memberId);
		res.send({ status: "OK", data: records });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getAllRecords = (req, res) => {
	try {
		const allRecords = recordService.getAllRecords();
		res.send({ status: "OK", data: allRecords });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneRecord = (req, res) => {
	const { recordId } = req.params;
	if (!recordId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':recordId' can not be empty",
			},
		});

	try {
		const record = recordService.getOneRecord(recordId);
		res.send({ status: "OK", data: record });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewRecord = (req, res) => {
	const { workout, record, member } = req.body;

	if (!workout || !record || !member) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error:
					"One of the following keys is missing or is empty in request body: 'workout', 'record', 'member'",
			},
		});
		return;
	}

	const newRecord = {
		workout,
		record,
		member,
	};

	try {
		const createdRecord = recordService.createNewRecord(newRecord);
		res.status(201).send({ status: "OK", data: createdRecord });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneRecord = (req, res) => {
	const {
		body,
		params: { recordId },
	} = req;
	if (!recordId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':recordId' can not be empty",
			},
		});

	try {
		const updatedRecord = recordService.updateOneRecord(recordId, body);
		res.send({ status: "OK", data: updatedRecord });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneRecord = (req, res) => {
	const { recordId } = req.params;
	if (!recordId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':recordId' can not be empty",
			},
		});

	try {
		recordService.deleteOneRecord(recordId);
		res.send({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
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
