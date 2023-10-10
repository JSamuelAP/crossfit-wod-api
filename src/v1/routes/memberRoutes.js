const express = require("express");
const { body } = require("express-validator");

const {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
} = require("../../controllers/memberController");
const { getRecordsForMember } = require("../../controllers/recordController");
const {
	notEmptyId,
	lengthIsInt,
	pageisInt,
} = require("../../helpers/dbValidators");
const { validateFields } = require("../../middlewares/validateFields");

const router = express.Router();

router.get("/", [lengthIsInt(), pageisInt(), validateFields], getAllMembers);

router.get(
	"/:memberId",
	[notEmptyId("memberId"), validateFields],
	getOneMember
);

router.get(
	"/:memberId/records",
	[notEmptyId("memberId"), validateFields],
	getRecordsForMember
);

router.post(
	"/",
	[
		body("name", "Key 'name' is missing or is empty").trim().notEmpty(),
		body("gender")
			.trim()
			.notEmpty()
			.isIn(["male", "female"])
			.withMessage("Key 'gender' can only be 'male' or 'female'"),
		body("dateOfBirth", "Key 'dateOfBirth' is missing or is empty")
			.trim()
			.notEmpty(),
		body("email", "Key 'email' is missing or is empty")
			.trim()
			.notEmpty()
			.isEmail()
			.withMessage("Key 'email' must be a valid email"),
		body("password", "Key 'password' is missing or is empty")
			.trim()
			.notEmpty()
			.isStrongPassword()
			.withMessage(
				"Key 'password' must have at least 8 characters long, one lowercase letter, one uppercase letter and one special character"
			),
		validateFields,
	],
	createNewMember
);

router.patch(
	"/:memberId",
	[
		notEmptyId("memberId"),
		body("name", "Key 'name' can not be empty").optional().trim().notEmpty(),
		body("gender", "Key 'gender' can not be empty")
			.optional()
			.trim()
			.notEmpty()
			.isIn(["male", "female"])
			.withMessage("Key 'gender' can only be 'male' or 'female'"),
		body("dateOfBirth", "Key 'dateOfBirth' can not be empty")
			.optional()
			.trim()
			.notEmpty(),
		body("email", "Key 'email' can not be empty")
			.optional()
			.trim()
			.notEmpty()
			.isEmail()
			.withMessage("Key 'email' must be a valid email"),
		body("password", "Key 'password' can not be empty")
			.optional()
			.trim()
			.notEmpty()
			.isStrongPassword()
			.withMessage(
				"Key 'password' must have at least 8 characters long, one lowercase letter, one uppercase letter and one special character"
			),
		validateFields,
	],
	updateOneMember
);

router.delete(
	"/:memberId",
	[notEmptyId("memberId"), validateFields],
	deleteOneMember
);

module.exports = router;
