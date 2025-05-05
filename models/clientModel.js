const db = require("../db/database");

exports.findByCoachId = (coachId, callback) => {
  const sql = "SELECT * FROM clients WHERE coach_id = ?";
  db.all(sql, [coachId], (err, rows) => {
    callback(err, rows);
  });
};
