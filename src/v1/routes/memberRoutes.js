import { Router } from "express";
import { body } from "express-validator";
import apicache from "apicache";
const cache = apicache.middleware;

import {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
} from "../../controllers/memberController.js";
import { getRecordsForMember } from "../../controllers/recordController.js";
import {
	notEmptyId,
	lengthIsInt,
	pageisInt,
} from "../../helpers/dbValidators.js";
import { validateFields } from "../../middlewares/validateFields.js";

const router = Router();

router.get(
	"/",
	cache("2 minutes"),
	[lengthIsInt(), pageisInt(), validateFields],
	getAllMembers
);

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

export default router;
