const memberService = require("../services/memberService");

const getAllMembers = (req, res) => {
	const { name, gender } = req.query;
	try {
		const allMembers = memberService.getAllMembers({ name, gender });
		res.send({ status: "OK", data: allMembers });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneMember = (req, res) => {
	const { memberId } = req.params;
	if (!memberId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':memberId' can not be empty",
			},
		});

	try {
		const member = memberService.getOneMember(memberId);
		res.send({ status: "OK", data: member });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewMember = (req, res) => {
	const { name, gender, dateOfBirth, email, password } = req.body;

	if (!name || !gender || !dateOfBirth || !email || !password) {
		res.status(400).send({
			status: "FAILED",
			data: {
				error:
					"One of the following keys is missing or is empty in request body: 'name', 'gender', 'dateOfBirth', 'email', 'password'",
			},
		});
		return;
	}

	const newMember = {
		name,
		gender,
		dateOfBirth,
		email,
		password,
	};

	try {
		const createdMember = memberService.createNewMember(newMember);
		res.status(201).send({ status: "OK", data: createdMember });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneMember = (req, res) => {
	const {
		body,
		params: { memberId },
	} = req;
	if (!memberId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':memberId' can not be empty",
			},
		});

	try {
		const updatedMember = memberService.updateOneMember(memberId, body);
		res.send({ status: "OK", data: updatedMember });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneMember = (req, res) => {
	const { memberId } = req.params;
	if (!memberId)
		res.status(400).send({
			status: "FAILED",
			data: {
				error: "Parameter ':memberId' can not be empty",
			},
		});

	try {
		memberService.deleteOneMember(memberId);
		res.send({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
};
