const { auth } = require("../middlewares");
const noteController = require("../controllers/note.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    console.log("note route");
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/notes",
    [auth.verifyToken],
    noteController.findAll
  );

  app.post(
    "/api/notes",
    [auth.verifyToken],
    noteController.insertNote
  );

  app.patch(
      "/api/notes/:id",
      [auth.verifyToken, auth.isNoteOwner],
      noteController.updateNote
  )

  app.delete(
    "/api/notes/:id",
    [auth.verifyToken, auth.isNoteOwner],
    noteController.deleteNote
  );
};
