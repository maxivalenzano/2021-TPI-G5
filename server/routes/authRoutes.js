const express = require("express");
const app = express();
const { verifySignUp } = require("../middleware");
const { signup, signin, recovery } = require("../controllers/authController");

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

app.post(
  "/auth/signup",
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  signup
);

app.post("/auth/signin", signin);

app.post(
  "/auth/recovery",
  [
    verifySignUp.checkUsernameOrEmail,
  ],
  recovery
);

module.exports = app;