const db = require("../db/database");

exports.getAll = (callback) => {
  db.all("SELECT * FROM users", callback);
};
