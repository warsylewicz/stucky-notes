const db = require("../models");
const User = db.user;

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

  User.findOneAndDelete({ email: email }, (err, user) => {
    if (err || !user) {
      res.status(404).send({ message: err });
      return;
    }

    res.status(200).end();
  });
};
