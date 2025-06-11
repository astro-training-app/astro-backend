const express = require("express");
const router = express.Router();
const measurementController = require("../controllers/measurementController");

router.post("/", measurementController.createMeasurement);
router.get("/", measurementController.getAllMeasurements);
router.get("/client/:id", measurementController.getMeasurementsByClientId);
router.delete("/:id", measurementController.deleteMeasurement);

module.exports = router;
