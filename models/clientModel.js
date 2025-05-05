const db = require("../db/database");

exports.findByCoachId = (coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE user_id = ?";
  db.all(sql, [coachId], (err, rows) => {
    callback(err, rows);
  });
};

exports.create = (
  nom,
  prenom,
  email,
  sexe,
  photo,
  age,
  objectif,
  userId,
  callback
) => {
  console.log("userId", userId);
  const sql = `
    INSERT INTO clients (nom, prenom, email, sexe, photo, age, objectif, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [nom, prenom, email, sexe, photo, age, objectif, userId];
  db.run(sql, params, callback);
};
