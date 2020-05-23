const { authJwt } = require("../middlewares");
const noteController = require("../controllers/note.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/notes",
    [authJwt.verifyToken],
    noteController.findAll
  );

  app.post(
    "/api/notes",
    [authJwt.verifyToken],
    noteController.create
  );

  app.patch(
      "/api/notes/:noteId",
      [authJwt.verifyToken],
      noteController.update
  )

  app.delete(
    "/api/notes/:noteId",
    [authJwt.verifyToken],
    noteController.delete
  );
};
