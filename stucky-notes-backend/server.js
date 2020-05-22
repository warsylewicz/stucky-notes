// ./config/server.js
"use strict";

// import the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const dbConfig = require("./config/db.config");

// database dependencies
const { startDatabase } = require('./database/mongo');
const { defineUser, getUsers, insertUser, deleteUser } = require('./database/users');
const { defineNote, getNotes, insertNote, updateNote, deleteNote } = require('./database/notes');

// defining the Express app
const app = express();

// enable CORS
let corsOptions = {
    origin: "http://localhost:8080"
};
app.use(cors(corsOptions));

// add middleware to app
// add Helmet to enhance security
app.use(helmet());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded( { extended: true } ));

// add morgan to log HTTP requests
app.use(morgan('combined'));

const db = require("./models");
const Role = db.role;

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}













//define endpoints according to https://app.swaggerhub.com/apis/awarsylewicz/stucky-notes-api/1.0.0
// find all users - only for admin
app.get('/api/users', async (req, res) => {
    res.send(await getUsers());
});

// add a new user
app.post('/api/users', async (req, res) => {
    let newUser = req.body;
    newUser.role = "";
    newUser = await insertUser(newUser);
    res.send(newUser);
});

// delete a user
app.delete('/api/users/:id', async (req, res) => {
    const deletedCount = await deleteUser(req.params.id);
    res.status(200).end();
});

// Notes
// get all notes
app.get('/api/notes', async (req, res) => {
    const notes = await getNotes();
    res.send(notes);
});

// create a new note
app.post('/api/notes', async (req, res) => {
    let newNote = req.body;
    newNote = await insertNote(newNote);
    res.send(newNote);
});

// update note - contents changed or it moved
app.patch('/api/notes/:noteId', async (req, res) => {
    let note = req.body;
    note = await updateNote(req.params.noteId, note);
    res.send(note);
});

// delete note
app.delete('/api/notes/:noteId', async (req, res) => {
    const deletedCount = await deleteNote(req.params,noteId);
    res.status(200).end();
});

// authentication
// login
app.post('/app/login', async (req, res) => {
    // todo
    res.status(200).end();
});

app.post('/app/register', async (req, res) => {
    // todo
    res.status(200).end();
})

// logout
app.post('/app/logout', async (req, res) => {
    // todo
    res.status(200).end();
})

// start the in-memory MondoDB instance
startDatabase().then(async () => {
    await defineUser(); // can't define user here due to how require works.  can't have two files requiring each other.
    await defineNote(); 
    const newUser = await insertUser({ email: 'admin@warsylewicz.ca', password: 'password', role: 'admin' });
    const newNote = await insertNote({ owner: "admin@warsylewicz.ca", posX: 0, posY: 0, dateCreated: Date(), dateModified: Date() });
    await updateNote(newNote._id, { contents: "foo2", posX: 1, posY: 2, dateModified: Date() });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});
