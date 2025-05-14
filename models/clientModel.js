const db = require("../db/database");

exports.findByCoachId = (coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE user_id = ?";
  db.all(sql, [coachId], (err, rows) => {
    callback(err, rows);
  });
};

exports.findById = (id, callback) => {
  const sql = "SELECT * FROM clients WHERE id = ?";
  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

// returns client by id if coachId matches
exports.findByIdAndCoachId = (id, coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE id = ? AND user_id = ?";
  db.get(sql, [id, coachId], (err, row) => {
    callback(err, row);
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

exports.update = (
  id,
  nom,
  prenom,
  email,
  sexe,
  photo,
  age,
  objectif,
  callback
) => {
  const sql = `
    UPDATE clients
    SET nom = ?, prenom = ?, email = ?, sexe = ?, photo = ?, age = ?, objectif = ?
    WHERE id = ?
  `;
  const params = [nom, prenom, email, sexe, photo, age, objectif, id];
  db.run(sql, params, callback);
};

exports.delete = (id, callback) => {
  const sql = "DELETE FROM clients WHERE id = ?";
  db.run(sql, [id], callback);
};
