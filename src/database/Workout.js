const DB = require("./db.json");
const {
	saveToDatabase,
	getCurrentDateTime,
	getPage,
	sortByDate,
} = require("./utils");

const getAllWorkouts = (filterParams, paginationParams, sortingParams) => {
	try {
		let workouts = DB.workouts;

		if (filterParams.mode)
			workouts = workouts.filter((workout) =>
				workout.mode.toLowerCase().includes(filterParams.mode)
			);
		if (filterParams.equipment)
			workouts = workouts.filter((workout) =>
				workout.equipment.includes(filterParams.equipment)
			);
		workouts = getPage(
			workouts,
			paginationParams.page,
			paginationParams.length
		);
		if (sortingParams.sort) workouts = sortByDate(workouts, sortingParams.sort);

		return workouts;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneWorkout = (workoutId) => {
	try {
		const workout = DB.workouts.find((workout) => workout.id === workoutId);
		if (!workout)
			throw {
				status: 404,
				message: `Can't find workout with the id '${workoutId}'`,
			};
		return workout;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const createNewWorkout = (newWorkout) => {
	try {
		const isAlreadyAdded =
			DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
		if (isAlreadyAdded)
			throw {
				status: 400,
				message: `Workout with the name '${newWorkout.name}' already exists`,
			};

		DB.workouts.push(newWorkout);
		saveToDatabase(DB);
		return newWorkout;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const updateOneWorkout = (workoutId, changes) => {
	try {
		const isAlreadyAdded =
			DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
		if (isAlreadyAdded)
			throw {
				status: 400,
				message: `Workout with the name '${changes.name}' already exists`,
			};

		const indexForUpdate = DB.workouts.findIndex(
			(workout) => workout.id === workoutId
		);
		if (indexForUpdate === -1)
			throw {
				status: 404,
				message: `Can't find workout with the id '${workoutId}'`,
			};

		const updatedWorkout = {
			...DB.workouts[indexForUpdate],
			...changes,
			updatedAt: getCurrentDateTime(),
		};
		DB.workouts[indexForUpdate] = updatedWorkout;
		saveToDatabase(DB);
		return updatedWorkout;
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

const deleteOneWorkout = (workoutId) => {
	try {
		const indexForDeletion = DB.workouts.findIndex(
			(workout) => workout.id === workoutId
		);
		if (indexForDeletion === -1)
			throw {
				status: 404,
				message: `Can't find workout with the id '${workoutId}'`,
			};
		DB.workouts.splice(indexForDeletion, 1);
		saveToDatabase(DB);
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

module.exports = {
	getAllWorkouts,
	getOneWorkout,
	createNewWorkout,
	updateOneWorkout,
	deleteOneWorkout,
};
