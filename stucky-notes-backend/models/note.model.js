const mongoose = require("mongoose");

const Note = mongoose.model(
  "Note",
  new mongoose.Schema({
    _id: String,
    contents: String,
    posX: Number,
    posY: Number,
    created: {
      type: Date,
      default: Date.now,
    },
    modified: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  })
);

module.exports = Note;
