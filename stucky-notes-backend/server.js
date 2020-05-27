// followed structure found in this tutorial: https://bezkoder.com/node-js-mongodb-auth-jwt/

"use strict";

// import the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bcrypt = require("bcrypt");
require("dotenv").config();

// define the Express app
const app = express();

// enable CORS
let corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// add Helmet to enhance security
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.json());

// add morgan to log HTTP requests
app.use(morgan("combined"));

const db = require("./models");
const Role = db.role;
const User = db.user;

db.mongoose
  .connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }

    // add the admin
    Role.findOne({ name: "admin" }, (err, role) => {
      if (err) {
        console.log("error", err);
        return;
      }

      // does the admin already exist?
      // TODO: convert to mongoose upsert
      User.findOne({ role: role._id }, (err, admin) => {
        if (err) {
          console.log("error", err);
          return;
        }

        if (admin) {
          return;
        }

        admin = new User({
          email: process.env.ADMIN_EMAIL,
          password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12),
          loggedInCount: 0,
          lastLogin: Date(),
          role: role._id,
        });

        admin.save((err) => {
          if (err) {
            console.log("error", err);
          }
        });
      });
    });
  });
}

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/note.routes")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
