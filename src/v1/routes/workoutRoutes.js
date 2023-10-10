const express = require("express");
const { body } = require("express-validator");

const {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
} = require("../../controllers/workoutController");
const { getRecordsForWorkout } = require("../../controllers/recordController");
const { validateFields } = require("../../middlewares/validateFields");
const {
	lengthIsInt,
	pageisInt,
	notEmptyId,
	notEmptyArray,
} = require("../../helpers/dbValidators");

const router = express.Router();

router.get("/", [lengthIsInt(), pageisInt(), validateFields], getAllWorkouts);

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
			.withMessage("Key 'equipment' must be an array"),
		body("exercises", "Key 'exercises' can not be empty")
			.optional()
			.notEmpty()
			.isArray()
			.withMessage("Key 'exercises' must be an array"),
		body("trainerTips", "Key 'trainerTips' can not be empty")
			.optional()
			.notEmpty()
			.isArray()
			.withMessage("Key 'trainerTips' must be an array"),
		validateFields,
	],
	updateOneWorkout
);

router.delete(
	"/:workoutId",
	[notEmptyId("workoutId"), validateFields],
	deleteOneWorkout
);

module.exports = router;
