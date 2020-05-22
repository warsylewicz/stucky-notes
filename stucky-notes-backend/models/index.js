const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.role = require("./role.model");
db.user = require("./user.model");
db.note = require("./note.model");

db.ROLES = ["user", "admin"];

module.exports = db;
