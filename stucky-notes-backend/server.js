// followed structure found in this tutorial: https://bezkoder.com/node-js-mongodb-auth-jwt/

"use strict";

// import the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const db = require("./db/utilities");
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

// add the routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/note.routes")(app);

// initialize database
db.initialize();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

