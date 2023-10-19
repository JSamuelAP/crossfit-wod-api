import Auth from "../database/Auth.js";

const login = async (credentials) => {
	try {
		return await Auth.login(credentials);
	} catch (error) {
		throw error;
	}
};

export default { login };
