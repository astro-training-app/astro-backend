const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurementController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, measurementController.createMeasurement);
router.get("/", authMiddleware, measurementController.getAllMeasurements);
router.get(
  "/client/:id",
  authMiddleware,
  measurementController.getMeasurementsByClientId
);
router.delete("/:id", authMiddleware, measurementController.deleteMeasurement);

module.exports = router;
