// database/users.js

const { getDatabase } = require('./mongo');

const collectionName = 'users';

async function defineUser() {
    const database = await getDatabase();
    await database.collection(collectionName).createIndex( { 'email': 1 }, { unique: true });
}

async function insertUser(user) {
    const database = await getDatabase();
    const { insertedUser } = await database.collection(collectionName).insertOne(user);
    return insertedUser;
}

async function getUsers() {
    const database = await getDatabase();
    return await database.collection(collectionName).find().toArray();
}

module.exports = {
    defineUser,
    insertUser,
    getUsers,
};
