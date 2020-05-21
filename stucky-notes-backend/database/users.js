// database/users.js

const { getDatabase } = require('./mongo');

const collectionName = 'users';

async function defineUser() {
    const database = await getDatabase();
    await database.collection(collectionName).createIndex( { 'email': 1 }, { unique: true });  // equivalent to creating a primary key
}

async function getUser(user) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne( { 'email': user.email });
}

async function getUsers() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function insertUser(user) {
    const database = await getDatabase();
    const insertedUser = await database.collection(collectionName).insertOne(user);
    // console.log(insertedUser.insertedId); // gets the id
    // console.log(insertedUser);
    return insertedUser.insertedId;
}

async function deleteUser(user) {
    const database = await getDatabase();
    const deletedUser = await database.collection(collectionName).deleteOne( { 'email': user.email });
    return deletedUser.deletedCount;
}

module.exports = {
    defineUser,
    getUser,
    getUsers,
    insertUser,
    deleteUser,
};
