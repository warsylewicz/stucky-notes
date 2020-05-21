// database/users.js

"use strict";


const { getDatabase } = require('./mongo');

const collectionName = 'users';

async function defineUser() {
    const database = await getDatabase();
    // email addresses must be unique but are not used as the primary key
    await database.collection(collectionName).createIndex({ 'email': 1 }, { unique: true });
}

async function getUserByEmail(email) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({ 'email': email });
}

async function getUsers() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function insertUser(user) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(user);
    return insertedId;
}

async function updateUser(id, user) {
    const database = await getDatabase();
    delete user._id;
    const { modifiedCount } = await database.collection(collectionName).updateOne(
        { _id: new ObjectID(id) },
        { $set: { ...user }, },
    );
}

async function deleteUser(id) {
    const database = await getDatabase();
    const deletedUser = await database.collection(collectionName).deleteOne({ _id: new Object(id) });
    return deletedUser.deletedCount;
}

module.exports = {
    defineUser,
    getUsers,
    getUserByEmail,
    insertUser,
    updateUser,
    deleteUser,
};
