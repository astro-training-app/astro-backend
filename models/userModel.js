const db = require("../db/database");
const bcrypt = require('bcryptjs');

/**
 * Find a user by their email address.
 * @param {string} email - The email address of the user to find.
 * @param {function} callback - The callback function to execute after the query.
 */
exports.findByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.get(sql, [email], (err, user) => {
    callback(err, user);
  });
};

/**
 * Create a new user in the database.
 * @param {object} userData - The data of the user to create.
 * @param {function} callback - The callback function to execute after the query.
 * 
*/
exports.createUser = (userData, callback) => {
  const saltRounds = 10; // Nombre de tours de salage (configurable)

  // Hacher le mot de passe avant de l'insérer
  bcrypt.hash(userData.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      // Passer l'erreur de hachage au callback
      return callback(err);
    }

    const sql = `INSERT INTO users (nom, email, password, type_compte, role, image)
                 VALUES (?, ?, ?, ?, ?, ?)`;
    const params = [
      userData.nom,
      userData.email,
      hashedPassword, // Utiliser le mot de passe haché
      userData.type_compte || 'freemium', // Valeur par défaut si non fourni
      userData.role || 'amateur', // Valeur par défaut si non fourni
      userData.image || null // Optionnel
    ];

    // Utiliser function() pour accéder à this.lastID
    db.run(sql, params, function (dbErr) {
      if (dbErr) {
        return callback(dbErr); // Passer l'erreur DB
      }
      // Retourner l'ID du nouvel utilisateur
      callback(null, { id: this.lastID });
    });
  });
};

//module.exports = exports;