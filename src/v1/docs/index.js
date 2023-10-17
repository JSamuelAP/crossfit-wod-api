const basicInfo = require("./swagger.json");
const schemas = require("./schemas.json");
const parameters = require("./parameters.json");
const requestBodies = require("./requestBodies.json");
const responses = require("./responses.json");
const workoutEndpoints = require("./workoutEndpoints.json");
const recordEndpoints = require("./recordEndpoints.json");
const memberEndpoints = require("./memberEndpoints.json");
const authEndpoints = require("./authEndpoints.json");

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

module.exports = swaggerSpec;
