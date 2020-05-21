// ./config/server.js

// import the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// database dependencies
const { startDatabase } = require('./database/mongo');
const { defineUser, getUsers, insertUser, deleteUser } = require('./database/users');
const { getNotes, insertNote, updateNote, deleteNote } = require('./database/notes');

// defining the Express app
const app = express();

// defining an array to work as the database
const ads = [
  { title: 'Hello, world!' }
];

// add middleware to app
// add Helmet to enhance security
app.use(helmet());

// bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enable CORS
app.use(cors());

// add morgan to log HTTP requests
app.use(morgan('combined'));

//define an endpoint
app.get('/', async (req, res) => {
  res.send(await getUsers());
});

// start the in-memory MondoDB instance

startDatabase().then(async () => {
  await defineUser();
  await insertUser({ email: 'admin@warsylewicz.ca', password: 'password', role: 'admin' });
  //await insertUser({ email: 'admin2@warsylewicz.ca', password: 'password', role: 'admin' });
  //await deleteUser({ email: 'admin2@warsylewicz.ca' });

  const _id = await insertNote( { owner: "admin@warsylewicz.ca", posX: 0, posY: 0, dateCreated: Date(), dateModified: Date() });
  await updateNote( { _id: _id, contents: "foo2", posX: 1, posY: 2, dateModified: Date()});

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
});

