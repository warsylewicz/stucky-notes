require("dotenv").config();
const db = require("../models");
const User = db.user;
const Role = db.role;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 12), //
  });

  Role.findOne({ name: "user" }, (err, role) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    user.role = role.id;
    user.loggedInCount = 0;
    user.lastLogin = new Date();

    user.save((err) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      res.send({ message: "User was registered successfully" });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("role", "-__v") // remove the __v version number set by mongoose
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).end();
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password",
        });
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 86400 * 14, // 2 weeks
      });

      res.status(200).send({
        id: user._id,
        email: user.email,
        role: user.role.name,
        accessToken: token,
      });
    });
};

exports.getUser = (req, res) => {
  User.findOne({ _id: req.userId })
    .populate("role", "-__v").exec( (err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    res.send( {
      email: user.email,
      role: user.role.name,
    });
  });
};
