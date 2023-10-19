import jwt from "jsonwebtoken";

import { readJSON } from "../database/utils.js";
const { members } = readJSON(import.meta.url, "../database/db.json");

const validarJWT = (req, res, next) => {
	const token = req.header("Authorization");

	if (!token)
		return res.status(401).json({
			status: "FAILED",
			data: {
				error: "No token provided in request",
			},
		});

	try {
		const { memberId } = jwt.verify(
			token.split(" ")[1], // Remove 'Bearer ' format
			process.env.SECRETJWTKEY
		);
		const member = members.find((member) => member.id === memberId);

		if (!member)
			return res.status(401).json({
				status: "FAILED",
				data: {
					error: "Invalid token, member doesn't exist",
				},
			});

		req.member = member.id;
		next();
	} catch (error) {
		return res.status(401).json({
			status: "FAILED",
			data: {
				error: "Invalid token",
			},
		});
	}
};

export { validarJWT };
