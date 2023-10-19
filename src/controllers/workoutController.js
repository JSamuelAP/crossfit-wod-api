import workoutService from "../services/workoutService.js";

const getAllWorkouts = (req, res) => {
	const { mode, equipment, length, page, sort } = req.query;
	try {
		const allWorkouts = workoutService.getAllWorkouts(
			{ mode, equipment },
			{ length, page },
			{ sort }
		);
		res.json({ status: "OK", data: allWorkouts });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneWorkout = (req, res) => {
	try {
		const workout = workoutService.getOneWorkout(req.params.workoutId);
		res.json({ status: "OK", data: workout });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewWorkout = (req, res) => {
	const { name, mode, equipment, exercises, trainerTips } = req.body;
	const newWorkout = {
		name,
		mode,
		equipment,
		exercises,
		trainerTips,
	};

	try {
		const createdWorkout = workoutService.createNewWorkout(newWorkout);
		res.status(201).json({ status: "OK", data: createdWorkout });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneWorkout = (req, res) => {
	const allowedProperties = [
		"name",
		"mode",
		"equipment",
		"exercises",
		"trainerTips",
	];
	const changes = {};

	for (const prop of allowedProperties)
		if (req.body.hasOwnProperty(prop)) changes[prop] = req.body[prop];

	try {
		const updatedWorkout = workoutService.updateOneWorkout(
			req.params.workoutId,
			changes
		);
		res.json({ status: "OK", data: updatedWorkout });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneWorkout = (req, res) => {
	try {
		workoutService.deleteOneWorkout(req.params.workoutId);
		res.status(204).json({ status: "OK" });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

export {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
};
