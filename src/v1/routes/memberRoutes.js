const express = require("express");

const {
	getAllMembers,
	getOneMember,
	createNewMember,
	updateOneMember,
	deleteOneMember,
} = require("../../controllers/memberController");
const { getRecordsForMember } = require("../../controllers/recordController");

const router = express.Router();

router.get("/", getAllMembers);

router.get("/:memberId", getOneMember);

router.get("/:memberId/records", getRecordsForMember);

router.post("/", createNewMember);

router.patch("/:memberId", updateOneMember);

router.delete("/:memberId", deleteOneMember);

module.exports = router;
