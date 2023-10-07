const Auth = require("../database/Auth");

const login = async (credentials) => {
	try {
		return await Auth.login(credentials);
	} catch (error) {
		throw error;
	}
};

module.exports = { login };
