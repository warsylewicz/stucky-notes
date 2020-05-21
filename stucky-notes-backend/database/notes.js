// database/notes.js

const { getDatabase } = require('./mongo');

const collectionName = 'notes';

async function getNotes() {
    const database = await getDatabase();
    return await database.collection(collectionName).find({}).toArray();
}

async function insertNote(note) {
    const database = await getDatabase();
    const insertedNote = await database.collection(collectionName).insertOne(note);
    // console.log(insertedNote.insertedId); // gets the id
    // console.log(insertedNote);
    return insertedNote.insertedId;
}

async function updateNote(note) {
    const database = await getDatabase();
    const updatedNote = await database.collection(collectionName).updateOne(
        { _id: note._id },
        { $set: { contents: note.contents, posX: note.posX, posY: note.posY, dateModified: note.dateModified } }
    );
}

async function deleteNote(_id) {
    const database = await getDatabase();
    const deletedNote = await database.collection(collectionName).deleteOne({ _id: _id });
    return deletedNote.deletedCount;
}

module.exports = {
    getNotes,
    insertNote,
    updateNote,
    deleteNote,
};
