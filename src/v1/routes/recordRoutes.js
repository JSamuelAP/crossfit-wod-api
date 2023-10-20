import { Router } from "express";
import { body } from "express-validator";
import apicache from "apicache";
const cache = apicache.middleware;

import {
	getAllRecords,
	getOneRecord,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
} from "../../controllers/recordController.js";
import {
	lengthIsInt,
	pageisInt,
	notEmptyId,
} from "../../helpers/dbValidators.js";
import { validateFields } from "../../middlewares/validateFields.js";

const router = Router();

router.get(
	"/",
	cache("2 minutes"),
	[lengthIsInt(), pageisInt(), validateFields],
	getAllRecords
);

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

export default router;
