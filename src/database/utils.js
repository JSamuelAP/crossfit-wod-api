const fs = require("node:fs");
const crypto = require("node:crypto");

const saveToDatabase = (DB) => {
	fs.writeFileSync("./src/database/db.json", JSON.stringify(DB, null, 2), {
		encoding: "utf-8",
	});
};

const getCurrentDateTime = () => {
	return new Date().toLocaleString("en-US", { timeZone: "UTC" });
};

const hashPassword = (password) => {
	return crypto.createHash("sha256").update(password).digest("hex");
};

const comparePassword = (password, hashedPassword) => {
	return hashPassword(password) === hashedPassword;
};

module.exports = {
	saveToDatabase,
	getCurrentDateTime,
	hashPassword,
	comparePassword,
};
