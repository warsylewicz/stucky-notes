const mongoose = require("mongoose");

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        loggedInCount: Number,
        lastLogin: Date,
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }
    })
);

module.exports = User;
