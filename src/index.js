const LocalDB = require('./db');

module.exports = {
    connect: (dbName) => new LocalDB(dbName),
};
