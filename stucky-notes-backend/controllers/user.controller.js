const db = require("../models");
const User = db.user;
const Role = db.role;

exports.findAll = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send(users);
  });
};

exports.create = (req, res) => {
  
};

exports.delete = (req, res) => {

};


// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send(`User Content: ${req.userId}.`);
// };

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };
