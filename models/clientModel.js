const db = require("../db/database");

exports.findByUserId = (coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE user_id = ?"; // ✅ corrigé ici
  db.all(sql, [coachId], (err, rows) => {
    callback(err, rows);
  });
};
