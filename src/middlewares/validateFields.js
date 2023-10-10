const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty())
		return res.status(400).json({
			status: "FAILED",
			data: {
				error: errors.array().map((error) => error.msg),
			},
		});
	next();
};

module.exports = { validateFields };
