// mongo.js

const { MongoClient } = require('mongodb');

let database = null;

async function startDatabase() {
    const mongoDBURL = "mongodb://localhost:27017/stucky-notes";
    const connection = await MongoClient.connect(mongoDBURL, { useUnifiedTopology: true, useNewUrlParser: true });
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

module.exports = {
    getDatabase,
    startDatabase,
}
