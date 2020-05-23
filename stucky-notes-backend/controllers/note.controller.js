const db = require("../models");
const { ObjectID } = require("mongodb");
const User = db.user;
const Role = db.role;
const Note = db.note;

exports.findAll = (req, res) => {
  const userId = req.userId;
  Note.find({ owner: userId }, (err, notes) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(notes);
  });
};

exports.create = (req, res) => {
  const userId = req.userId;
  const note = new Note({
    _id: new ObjectID(),
    contents: req.body.contents,
    posX: req.body.posX,
    posY: req.body.posY,
    created: Date(),
    modified: Date(),
    owner: new ObjectID(req.userId),
  });
  note.save((err, savedNote) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(savedNote);
  });
};

exports.update = (req, res) => {
  const userId = req.userId;
  const noteId = req.params.noteId;

  let updateForNote = {
    contents: req.body.contents,
    posX: req.body.posX,
    posY: req.body.posY,
    modified: Date(),
  };

  Note.findOneAndUpdate(
    { owner: userId, _id: noteId },
    updateForNote,
    { new: true, useFindAndModify: false },
    (err, savedNote) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!savedNote) {
        res.status(404).send({ message: "Note not found." });
        return;
      }
      res.send(savedNote);
    }
  );
};

exports.delete = (req, res) => {
  const userId = req.userId;
  const noteId = req.params.noteId;

  Note.findOneAndDelete({ owner: userId, _id: noteId }, (err, note) => {
    if (err || !note) {
      res.status(404).send({ message: err });
      return;
    }

    res.status(200).send();
  });
};
