const measurementModel = require("../models/measurementModel");

exports.createMeasurement = (req, res) => {
  const { date, weight, height, biceps, chest, waist, thigh, client_id } =
    req.body;

  const data = { date, weight, height, biceps, chest, waist, thigh, client_id };

  measurementModel.create(data, (err, lastID) => {
    if (err) {
      console.error("SQLite error:", err.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to create measurement",
      });
    }

    res.status(201).json({
      status: "success",
      message: "Measurement created successfully",
      data: { id: lastID },
    });
  });
};

exports.getAllMeasurements = (req, res) => {
  measurementModel.findAll((err, rows) => {
    if (err) {
      console.error("SQLite error:", err.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch measurements",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

exports.getMeasurementsByClientId = (req, res) => {
  const clientId = req.params.id;

  measurementModel.findByClientId(clientId, (err, rows) => {
    if (err) {
      console.error("SQLite error:", err.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to fetch client measurements",
      });
    }

    res.status(200).json({
      status: "success",
      data: rows,
    });
  });
};

exports.deleteMeasurement = (req, res) => {
  const id = req.params.id;

  measurementModel.delete(id, (err) => {
    if (err) {
      console.error("SQLite error:", err.message);
      return res.status(500).json({
        status: "error",
        message: "Failed to delete measurement",
      });
    }

    res.status(200).json({
      status: "success",
      message: `Measurement with ID ${id} deleted successfully`,
    });
  });
};
