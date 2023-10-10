const express = require("express");
const { body } = require("express-validator");

const { login } = require("../../controllers/authController");
const { validateFields } = require("../../middlewares/validateFields");

const router = express.Router();

router.post(
	"/",
	[
		body("email", "Key 'email' is missing or is is empty")
			.notEmpty()
			.isEmail()
			.withMessage("Key 'email' is not a valid email"),
		body("password", "Key 'password' is missing or is empty").notEmpty(),
		validateFields,
	],
	login
);

module.exports = router;
