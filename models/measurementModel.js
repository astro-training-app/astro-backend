const db = require("../db/database");

exports.create = (data, callback) => {
  const sql = `
    INSERT INTO measurements (
      date, weight, height, biceps,
      chest, waist, thigh, client_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.date,
    data.weight,
    data.height,
    data.biceps,
    data.chest,
    data.waist,
    data.thigh,
    data.client_id,
  ];

  db.run(sql, values, function (err) {
    callback(err, this?.lastID);
  });
};

exports.findAll = (callback) => {
  const sql = `SELECT * FROM measurements`;
  db.all(sql, [], callback);
};

exports.findByClientId = (clientId, callback) => {
  const sql = `
    SELECT * FROM measurements
    WHERE client_id = ?
    ORDER BY date ASC
  `;
  db.all(sql, [clientId], callback);
};

exports.delete = (id, callback) => {
  const sql = "DELETE FROM measurements WHERE id = ?";
  db.run(sql, [id], callback);
};
