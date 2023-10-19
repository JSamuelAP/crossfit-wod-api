import { readJSON } from "../../database/utils.js";
const basicInfo = readJSON(import.meta.url, "./swagger.json");
const schemas = readJSON(import.meta.url, "./schemas.json");
const parameters = readJSON(import.meta.url, "./parameters.json");
const requestBodies = readJSON(import.meta.url, "./requestBodies.json");
const responses = readJSON(import.meta.url, "./responses.json");
const workoutEndpoints = readJSON(import.meta.url, "./workoutEndpoints.json");
const recordEndpoints = readJSON(import.meta.url, "./recordEndpoints.json");
const memberEndpoints = readJSON(import.meta.url, "./memberEndpoints.json");
const authEndpoints = readJSON(import.meta.url, "./authEndpoints.json");

const swaggerSpec = {
	...basicInfo,
	components: {
		...schemas,
		...parameters,
		...requestBodies,
		...responses,
	},
	paths: {
		...workoutEndpoints,
		...recordEndpoints,
		...memberEndpoints,
		...authEndpoints,
	},
};

export default swaggerSpec;
