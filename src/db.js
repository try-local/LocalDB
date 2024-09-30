const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class LocalDB {
    constructor(dbFile = path.join(__dirname, 'notes.db')) {
        this.db = new sqlite3.Database(dbFile, (err) => {
            if (err) {
                console.error('Error opening database ' + err.message);
            } else {
                this.createTable();
            }
        });
    }

    createTable() {
        this.db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            content TEXT NOT NULL,
            tag TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`);
    }

    // Add a new note with title, content, and tag
    addNote(title, content, tag) {
        return new Promise((resolve, reject) => {
            const sql = 'INSERT INTO notes (title, content, tag) VALUES (?, ?, ?)';
            this.db.run(sql, [title, content, tag], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve({ id: this.lastID, title, content, tag });
                }
            });
        });
    }

    // Retrieve all notes
    getNotes() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM notes ORDER BY created_at DESC';
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    // Delete a note by its ID
    deleteNote(id) {
        return new Promise((resolve, reject) => {
            const sql = 'DELETE FROM notes WHERE id = ?';
            this.db.run(sql, id, function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes);
                }
            });
        });
    }

    // Update an existing note
    updateNote(id, title, content, tag) {
        return new Promise((resolve, reject) => {
            const sql = 'UPDATE notes SET title = ?, content = ?, tag = ? WHERE id = ?';
            this.db.run(sql, [title, content, tag, id], function(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this.changes); // Returns the number of rows changed
                }
            });
        });
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.error('Error closing the database ' + err.message);
            }
        });
    }
}

module.exports = new LocalDB();