import memberService from "../services/memberService.js";

const getAllMembers = (req, res) => {
	const { name, gender, length, page, sort } = req.query;
	try {
		const allMembers = memberService.getAllMembers(
			{ name, gender },
			{ length, page },
			{ sort }
		);
		res.json({ status: "OK", data: allMembers });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneMember = (req, res) => {
	try {
		const member = memberService.getOneMember(req.params.memberId);
		res.json({ status: "OK", data: member });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewMember = (req, res) => {
	const { name, gender, dateOfBirth, email, password } = req.body;
	const newMember = {
		name,
		gender,
		dateOfBirth,
		email,
		password,
	};

	try {
		const createdMember = memberService.createNewMember(newMember);
		res.status(201).json({ status: "OK", data: createdMember });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneMember = (req, res) => {
	const allowedProperties = [
		"name",
		"gender",
		"dateOfBirth",
		"email",
		"password",
	];
	const changes = {};

	for (const prop of allowedProperties)
		if (req.body.hasOwnProperty(prop)) changes[prop] = req.body[prop];

	try {
		const updatedMember = memberService.updateOneMember(
			req.params.memberId,
			changes
		);
		res.json({ status: "OK", data: updatedMember });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneMember = (req, res) => {
	try {
		memberService.deleteOneMember(req.params.memberId);
		res.json({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

export {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
};
