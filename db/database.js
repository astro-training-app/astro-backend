// db/database.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const fs = require("fs");
const schema = require("./schema");

const isTest = process.env.NODE_ENV === "test";
const dbFile = isTest ? "test.db" : "coachapp.db";
const dbPath = path.join(__dirname, dbFile);

const isNew = !fs.existsSync(dbPath);
const db = new sqlite3.Database(dbPath);

if (isNew) {
  db.serialize(() => {
    schema.forEach((query) => db.run(query));
  });
}

module.exports = db;
