const crypto = require("node:crypto");

const Workout = require("../database/Workout");
const { getCurrentDateTime } = require("../database/utils");

const getAllWorkouts = (filterParams) => {
	try {
		const allWorkouts = Workout.getAllWorkouts(filterParams);
		return allWorkouts;
	} catch (error) {
		throw error;
	}
};

const getOneWorkout = (workoutId) => {
	try {
		const workout = Workout.getOneWorkout(workoutId);
		return workout;
	} catch (error) {
		throw error;
	}
};

const createNewWorkout = (newWorkout) => {
	const workoutToInsert = {
		id: crypto.randomUUID(),
		...newWorkout,
		createdAt: getCurrentDateTime(),
		updatedAt: getCurrentDateTime(),
	};

	try {
		const createdWorkout = Workout.createNewWorkout(workoutToInsert);
		return createdWorkout;
	} catch (error) {
		throw error;
	}
};

const updateOneWorkout = (workoutId, changes) => {
	try {
		const updatedWorkout = Workout.updateOneWorkout(workoutId, changes);
		return updatedWorkout;
	} catch (error) {
		throw error;
	}
};

const deleteOneWorkout = (workoutId) => {
	try {
		Workout.deleteOneWorkout(workoutId);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
};
