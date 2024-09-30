const LocalDB = require('./db');

module.exports = {
    addNote: LocalDB.addNote.bind(LocalDB),
    getNotes: LocalDB.getNotes.bind(LocalDB),
    deleteNote: LocalDB.deleteNote.bind(LocalDB),
    updateNote: LocalDB.updateNote.bind(LocalDB),
};

module.exports = {
    connect: (dbName) => new LocalDB(dbName),
};
