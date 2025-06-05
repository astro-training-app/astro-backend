const db = require("../db/database");

exports.getAll = (callback) => {
  db.all("SELECT * FROM users", callback);
};

exports.findById = (id, callback) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.get(sql, [id], callback);
};

exports.findByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], callback);
};

exports.update = (id, name, role, callback) => {
  const sql = "UPDATE users SET nom = ?, role = ? WHERE id = ?";
  db.run(sql, [name, role, id], callback);
};

exports.delete = (id, callback) => {
  const sql = "DELETE FROM users WHERE id = ?";
  db.run(sql, [id], callback);
};
