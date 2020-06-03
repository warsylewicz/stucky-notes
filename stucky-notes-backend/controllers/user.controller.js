const db = require("../models");
const User = db.user;
const Role = db.role;

exports.findAll = (req, res) => {
  Role.findOne({ name: "user" }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    User.find({ role: role.id }, (err, users) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send(users);
    });
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
