import jwt from "jsonwebtoken";

const generateJWT = (payload) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.SECRETJWTKEY,
			{ expiresIn: "1d" },
			(err, token) => {
				if (err) reject("Couldn't generate JWT");
				else resolve(token);
			}
		);
	});
};

export { generateJWT };
