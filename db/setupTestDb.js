// db/setupTestDb.js
const fs = require("fs");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const schema = require("./schema");

const dbPath = path.join(__dirname, "test.db");

function resetTestDb() {
  return new Promise((resolve, reject) => {
    // Ferme la base si elle est ouverte
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) return reject(err);

      db.close((err) => {
        // Ignore erreurs de fermeture
        if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

        const freshDb = new sqlite3.Database(dbPath);
        freshDb.serialize(() => {
          schema.forEach((query) => freshDb.run(query));
        });
        resolve();
      });
    });
  });
}

module.exports = resetTestDb;
