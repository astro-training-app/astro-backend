const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");

router.get("/", coachController.getAllCoaches);
router.post("/", coachController.createCoach);

module.exports = router;
