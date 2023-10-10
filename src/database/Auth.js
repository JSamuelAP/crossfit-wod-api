const DB = require("./db.json");
const { comparePassword } = require("./utils");
const { generateJWT } = require("../helpers/generateJWT");

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

module.exports = {
	login,
};
