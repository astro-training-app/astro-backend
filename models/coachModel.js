const db = require("../db/database");

exports.getAll = (callback) => {
  db.all("SELECT * FROM coaches", callback);
};

exports.create = (name, email, callback) => {
  db.run(
    "INSERT INTO coaches (name, email) VALUES (?, ?)",
    [name, email],
    callback
  );
};
