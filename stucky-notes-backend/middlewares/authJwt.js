const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;
const Role = db.role;

require("dotenv").config();

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      res.status(404).send({ message: "No user found" });
      return;
    }

    Role.find({ _id: user.role }, (err, role) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (role.name === "admin") {
        next();
        return;
      }

      res.status(403).send({ message: "Require Admin Role!" });
      return;
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
};
module.exports = authJwt;
