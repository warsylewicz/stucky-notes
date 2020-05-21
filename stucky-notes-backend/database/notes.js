// database/notes.js
"use strict";

const { getDatabase } = require('./mongo');
const { ObjectID } = require('mongodb');

const collectionName = 'notes';

async function getNotes() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function insertNote(note) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(note);
    return insertedId;
}

async function updateNote(id, note) {
    const database = await getDatabase();
    delete note._id;
    const { modifiedCount } = await database.collection(collectionName).updateOne(
        { _id: new ObjectID(id) },
        { $set: { ...note, }, },
    );
    return modifiedCount;
}

async function deleteNote(id) {
    const database = await getDatabase();
    const { deletedCount } = await database.collection(collectionName).deleteOne({ _id: new ObjectID(id) });
    return deletedCount;
}

module.exports = {
    getNotes,
    insertNote,
    updateNote,
    deleteNote,
};
