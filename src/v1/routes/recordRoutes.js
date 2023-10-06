const express = require("express");

const {
	getAllRecords,
	getOneRecord,
	createNewRecord,
	updateOneRecord,
	deleteOneRecord,
} = require("../../controllers/recordController");

const router = express.Router();

router.get("/", getAllRecords);

router.get("/:recordId", getOneRecord);

router.post("/", createNewRecord);

router.patch("/:recordId", updateOneRecord);

router.delete("/:recordId", deleteOneRecord);

module.exports = router;
