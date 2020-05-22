// database/notes.js
"use strict";

const { getDatabase } = require(('../database/mongo'));
const { ObjectID } = require('mongodb');

const collectionName = 'notes';

async function defineNote() {
    const database = await getDatabase();
    await database.collection(collectionName).drop();
}

async function getNotes() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function getNote(id) {
    const database = await getDatabase();
    return await database.collection(collectionName).findOne({ _id: new ObjectID(id) });
}

async function insertNote(note) {
    const database = await getDatabase();
    const { insertedId } = await database.collection(collectionName).insertOne(note);
    note = getNote(insertedId);
    return note;
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
    defineNote,
    getNotes,
    getNote,
    insertNote,
    updateNote,
    deleteNote,
};
