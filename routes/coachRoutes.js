const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");
const authenticateToken = require("../middlewares/authMiddleware");

router.get("/all", coachController.getAllCoaches);
router.get("/", authenticateToken, coachController.getCoach);

router.put("/", authenticateToken, coachController.updateCoach);

router.delete("/", authenticateToken, coachController.deleteCoach);

module.exports = router;
