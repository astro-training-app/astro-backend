const express = require("express");
const router = express.Router();
const mensurationsControlleur = require("../controllers/mensurationsControlleur");
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
    client_id,
  } = req.body;

  const sql = `
    INSERT INTO mensurations (
      date_mesure, poids, taille, tour_biceps,
      tour_poitrine, tour_taille, tour_cuisse, client_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    date_mesure,
    poids,
    taille,
    tour_biceps,
    tour_poitrine,
    tour_taille,
    tour_cuisse,
    client_id,
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

router.get("/", (req, res) => {
  const sql = `SELECT * FROM mensurations`;

  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error("Erreur SQLite :", err.message);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.status(200).json(rows);
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM mensurations WHERE id = ?";

  db.run(sql, [id], function (err) {
    if (err) {
      console.error("Erreur SQLite :", err.message);
      return res.status(500).json({ message: "Erreur lors de la suppression" });
    }

    res.status(200).json({ message: "Mensuration supprimée avec succès" });
  });
});

router.get("/client/:id", (req, res) => {
  const clientId = req.params.id;

  const sql = `
  SELECT * FROM mensurations WHERE client_id = ? ORDER BY date_mesure ASC`;

  db.all(sql, [clientId], (err, rows) => {
    if (err) {
      console.error("Erreur SQLite :", err.message);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.status(200).json(rows);
  });
});

module.exports = router;
