const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('db/todo.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY,
                title TEXT,
                description TEXT
            )`, (err) => {
                    if (err) {
                        console.error(err.message);
                    }
    });
  });

module.exports = db;