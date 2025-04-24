const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/coachapp.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    image TEXT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    type_compte TEXT,
    role TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS clients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT,
    prenom TEXT,
    email TEXT,
    sexe TEXT,
    photo TEXT,
    age INTEGER,
    objectif TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS mensurations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    date_mesure TEXT,
    poids REAL,
    taille REAL,
    tour_biceps REAL,
    tour_poitrine REAL,
    tour_taille REAL,
    tour_cuisse REAL,
    user_id INTEGER,
    client_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
  )`);
});

module.exports = db;
