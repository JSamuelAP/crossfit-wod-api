const workoutService = require("../services/workoutService");

const getAllWorkouts = (req, res) => {
	const allWorkouts = workoutService.getAllWorkouts();
	res.send({ status: "OK", data: allWorkouts });
};

const getOneWorkout = (req, res) => {
	const { workoutId } = req.params;
	if (!workoutId) return;

	const workout = workoutService.getOneWorkout(workoutId);

	res.send({ status: "OK", data: workout });
};

const createNewWorkout = (req, res) => {
	const { name, mode, equipment, exercises, trainerTips } = req.body;

	if (!name || !mode || !equipment || !exercises || !trainerTips) return;

	const newWorkout = {
		name,
		mode,
		equipment,
		exercises,
		trainerTips,
	};

	const createdWorkout = workoutService.createNewWorkout(newWorkout);

	res.status(201).send({ status: "OK", data: createdWorkout });
};

const updateOneWorkout = (req, res) => {
	const {
		body,
		params: { workoutId },
	} = req;
	if (!workoutId) return;

	const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);

	res.send({ status: "OK", data: updatedWorkout });
};

const deleteOneWorkout = (req, res) => {
	const { workoutId } = req.params;
	if (!workoutId) return;

	workoutService.deleteOneWorkout(workoutId);

	res.status(204).send({ status: "OK" });
};

module.exports = {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
};
