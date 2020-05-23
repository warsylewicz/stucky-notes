const { authJwt } = require("../middlewares");
const userController = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.findAll
  );

  app.post(
    "/api/users",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.create
  );

  app.delete(
    "/api/user/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.delete
  );
};
