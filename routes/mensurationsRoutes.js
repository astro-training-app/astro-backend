const express = require("express");
const router = express.Router();
const db = require("../db/database");

router.post("/", (req, res) => {
  const {
    date_mesure,
    poids,
    taille,
    tour_biceps,
    tour_poitrine,
    tour_taille,
    tour_cuisse,
  } = req.body;

  const sql = `
    INSERT INTO mensurations (
      date_mesure, poids, taille, tour_biceps,
      tour_poitrine, tour_taille, tour_cuisse
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date_mesure,
    poids,
    taille,
    tour_biceps,
    tour_poitrine,
    tour_taille,
    tour_cuisse,
  ];

  db.run(sql, values, function (err) {
    if (err) {
      console.error("Erreur SQLite :", err.message);
      return res
        .status(500)
        .json({ message: "Erreur lors de l'enregistrement" });
    }

    res
      .status(201)
      .json({ message: "Mensuration enregistrée", id: this.lastID });
  });
});

module.exports = router;
