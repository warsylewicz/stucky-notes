const db = require("../models");
const User = db.user;
const Note = db.note;

exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(users);
  });
};


exports.delete = (req, res) => {
  const email = req.params.email;

  // delete all of the user's notes
  // TODO !!
  

  User.findOneAndDelete({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(404).send({ message: err });
      return;
    }

    res.status(200).end();
  });
};
