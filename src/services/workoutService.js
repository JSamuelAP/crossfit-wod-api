const crypto = require("node:crypto");

const Workout = require("../database/Workout");

const getAllWorkouts = () => {
	const allWorkouts = Workout.getAllWorkouts();
	return allWorkouts;
};

const getOneWorkout = (workoutId) => {
	const workout = Workout.getOneWorkout(workoutId);
	return workout;
};

const createNewWorkout = (newWorkout) => {
	const workoutToInsert = {
		...newWorkout,
		id: crypto.randomUUID(),
		createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
		updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
	};

	const createdWorkout = Workout.createNewWorkout(workoutToInsert);
	return createdWorkout;
};

const updateOneWorkout = (workoutId, changes) => {
	const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
	return updatedWorkout;
};

const deleteOneWorkout = (workoutId) => {
	Workout.deleteOneWorkout(workoutId);
};

module.exports = {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
};
