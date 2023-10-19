import { param, query } from "express-validator";

const notEmptyId = (paramId) =>
	param(paramId, `Parameter ':${paramId}' can not be empty`).trim().notEmpty();

const lengthIsInt = () =>
	query("length", "Query 'length' must be a positive integer")
		.optional()
		.isInt({ min: 1 });

const pageisInt = () =>
	query("page", "Query 'page' must be a positive integer")
		.optional()
		.isInt({ min: 1 });

const notEmptyArray = (array, { path }) => {
	if (array.length === 0)
		throw new Error(`Key '${path}' can not be an empty array`);
	return true;
};

export { notEmptyId, lengthIsInt, pageisInt, notEmptyArray };
