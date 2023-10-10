const authService = require("../services/authService");

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const { memberId, token } = await authService.login({ email, password });
		res.header("Authorization", token).json({ memberId, token });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = { login };
