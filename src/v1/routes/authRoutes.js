import { Router } from "express";
import { body } from "express-validator";

import { login } from "../../controllers/authController.js";
import { validateFields } from "../../middlewares/validateFields.js";

const router = Router();

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

export default router;
