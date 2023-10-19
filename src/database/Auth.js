import { comparePassword, readJSON } from "./utils.js";
import { generateJWT } from "../helpers/generateJWT.js";
const DB = readJSON(import.meta.url, "./db.json");

const login = async (credentials) => {
	try {
		const member = DB.members.find(
			(member) => member.email === credentials.email
		);
		if (
			!member ||
			!comparePassword(credentials.password, member?.password || "")
		)
			throw {
				status: 401,
				message: `Email or password incorrect`,
			};

		const token = await generateJWT({ memberId: member.id });
		return { memberId: member.id, token };
	} catch (error) {
		throw { status: error?.status || 500, message: error?.message || error };
	}
};

export default { login };
