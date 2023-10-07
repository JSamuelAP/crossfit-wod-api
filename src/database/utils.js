const fs = require("node:fs");
const crypto = require("node:crypto");

const jwt = require("jsonwebtoken");

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

const getPage = (array = [], page = 1, length = 20) => {
	page = parseInt(page);
	length = parseInt(length);
	const startIndex = (page - 1) * length;
	const endIndex = page * length;
	return array.slice(startIndex, endIndex);
};

const sortByDate = (array = [], propertyDate) => {
	const allowedSortValues = [
		"createdAt",
		"updatedAt",
		"-createdAt",
		"-updatedAt",
	];

	if (allowedSortValues.includes(propertyDate)) {
		const descending = propertyDate.charAt(0) === "-";
		const property = descending ? propertyDate.substring(1) : propertyDate;

		return array.sort((obj1, obj2) => {
			const date1 = new Date(obj1[property]);
			const date2 = new Date(obj2[property]);
			const order = descending ? -1 : 1; // sorting direction

			if (date1 < date2) return -1 * order;
			else if (date1 > date2) return order;
			else return 0; // Equals
		});
	}

	return array;
};

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

module.exports = {
	saveToDatabase,
	getCurrentDateTime,
	hashPassword,
	comparePassword,
	getPage,
	sortByDate,
	generateJWT,
};
