const coachModel = require("../models/coachModel");

exports.getAllCoaches = (req, res) => {
  coachModel.getAll((err, coaches) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(coaches);
  });
};

exports.createCoach = (req, res) => {
  const { name, email } = req.body;
  coachModel.create(name, email, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Coach created" });
  });
};
