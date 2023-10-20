import { Router } from "express";
import { body } from "express-validator";
import apicache from "apicache";
const cache = apicache.middleware;

import {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
} from "../../controllers/workoutController.js";
import { getRecordsForWorkout } from "../../controllers/recordController.js";
import { validateFields } from "../../middlewares/validateFields.js";
import {
	lengthIsInt,
	pageisInt,
	notEmptyId,
	notEmptyArray,
} from "../../helpers/dbValidators.js";

const router = Router();

router.get(
	"/",
	cache("2 minutes"),
	[lengthIsInt(), pageisInt(), validateFields],
	getAllWorkouts
);

router.get(
	"/:workoutId",
	[notEmptyId("workoutId"), validateFields],
	getOneWorkout
);

router.get(
	"/:workoutId/records",
	[notEmptyId("workoutId"), validateFields],
	getRecordsForWorkout
);

router.post(
	"/",
	[
		body("name", "Key 'name' is missing or is empty").trim().notEmpty(),
		body("mode", "Key 'mode' is missing or is empty").trim().notEmpty(),
		body("equipment", "Key 'equipment' is missing or is empty")
			.exists()
			.bail()
			.isArray()
			.withMessage("Key 'equipment' must be an array")
			.custom(notEmptyArray),
		body("exercises", "Key 'exercises' is missing or is empty")
			.exists()
			.bail()
			.isArray()
			.withMessage("Key 'exercises' must be an array")
			.custom(notEmptyArray),
		body("trainerTips", "Key 'trainerTips' is missing or is empty")
			.exists()
			.bail()
			.isArray()
			.withMessage("Key 'trainerTips' must be an array")
			.custom(notEmptyArray),
		validateFields,
	],
	createNewWorkout
);

router.patch(
	"/:workoutId",
	[
		notEmptyId("workoutId"),
		body("name", "Key 'name' can not be empty").optional().trim().notEmpty(),
		body("mode", "Key 'mode' can not be empty").optional().trim().notEmpty(),
		body("equipment", "Key 'equipment' can not be empty")
			.optional()
			.notEmpty()
			.isArray()
			.withMessage("Key 'equipment' must be an array")
			.custom(notEmptyArray),
		body("exercises", "Key 'exercises' can not be empty")
			.optional()
			.notEmpty()
			.isArray()
			.withMessage("Key 'exercises' must be an array")
			.custom(notEmptyArray),
		body("trainerTips", "Key 'trainerTips' can not be empty")
			.optional()
			.notEmpty()
			.isArray()
			.withMessage("Key 'trainerTips' must be an array")
			.custom(notEmptyArray),
		validateFields,
	],
	updateOneWorkout
);

router.delete(
	"/:workoutId",
	[notEmptyId("workoutId"), validateFields],
	deleteOneWorkout
);

export default router;
