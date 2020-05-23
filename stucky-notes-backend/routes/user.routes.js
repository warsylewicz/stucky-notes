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

  app.delete(
    "/api/users/:email",
    [authJwt.verifyToken, authJwt.isAdmin],
    userController.delete
  );
};
