const express = require("express");
const { body } = require("express-validator");

const {
	getAllRecords,
	getOneRecord,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
} = require("../../controllers/recordController");
const {
	lengthIsInt,
	pageisInt,
	notEmptyId,
} = require("../../helpers/dbValidators");
const { validateFields } = require("../../middlewares/validateFields");

const router = express.Router();

router.get("/", [lengthIsInt(), pageisInt(), validateFields], getAllRecords);

router.get(
	"/:recordId",
	[notEmptyId("recordId"), validateFields],
	getOneRecord
);

router.post(
	"/",
	[
		body("record", "Key 'record' is missing or is empty").trim().notEmpty(),
		body("workout", "Key 'workout' is missing or is empty").trim().notEmpty(),
		body("member", "Key 'member' is missing or is empty").trim().notEmpty(),
		validateFields,
	],
	createNewRecord
);

router.patch(
	"/:recordId",
	[
		body("record", "Key 'record' can not be empty")
			.optional()
			.trim()
			.notEmpty(),
		body("workout", "Key 'workout' can not be empty")
			.optional()
			.trim()
			.notEmpty(),
		body("member", "Key 'member' can not be empty")
			.optional()
			.trim()
			.notEmpty(),
		validateFields,
	],
	updateOneRecord
);

router.delete(
	"/:recordId",
	[notEmptyId("recordId"), validateFields],
	deleteOneRecord
);

module.exports = router;
