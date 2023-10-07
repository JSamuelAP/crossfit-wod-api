const authService = require("../services/authService");

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password)
		res.status(400).send({
			status: "FAILED",
			data: {
				error:
					"One of the following keys is missing or is empty in request body: 'email', 'password'",
			},
		});

	try {
		const { memberId, token } = await authService.login({ email, password });
		res.header("Authorization", token).json({ memberId, token });
	} catch (error) {
		res
			.status(error?.status || 500)
			.send({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = { login };
