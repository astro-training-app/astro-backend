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

exports.findByIdAndCoachId = (id, coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE id = ? AND user_id = ?";
  db.get(sql, [id, coachId], (err, row) => {
    callback(err, row);
  });
};

exports.create = (
  lastName,
  firstName,
  email,
  gender,
  photo,
  age,
  goal,
  userId,
  callback
) => {
  const sql = `
    INSERT INTO clients (last_name, first_name, email, gender, photo, age, goal, user_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [lastName, firstName, email, gender, photo, age, goal, userId];
  db.run(sql, params, callback);
};

exports.update = (
  id,
  lastName,
  firstName,
  email,
  gender,
  photo,
  age,
  goal,
  callback
) => {
  const sql = `
    UPDATE clients
    SET last_name = ?, first_name = ?, email = ?, gender = ?, photo = ?, age = ?, goal = ?
    WHERE id = ?
  `;
  const params = [lastName, firstName, email, gender, photo, age, goal, id];
  db.run(sql, params, callback);
};

exports.delete = (id, callback) => {
  const sql = "DELETE FROM clients WHERE id = ?";
  db.run(sql, [id], callback);
};
