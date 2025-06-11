const db = require("../db/database");
const bcrypt = require("bcryptjs");

exports.findByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    callback(err, user);
  });
};

exports.createUser = (userData, callback) => {
  const saltRounds = 10;

  bcrypt.hash(userData.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return callback(err);
    }

    const sql = `
      INSERT INTO users (name, email, password, account_type, role, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      userData.name,
      userData.email,
      hashedPassword,
      userData.account_type || "freemium",
      userData.role || "amateur",
      userData.image || null,
    ];

    db.run(sql, params, function (dbErr) {
      if (dbErr) {
        return callback(dbErr);
      }
      callback(null, { id: this.lastID });
    });
  });
};
