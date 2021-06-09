const db = require("../models/sequelize");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Disculpe, el nombre de usuario ya está en uso!"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Disculpe, el email ya está en uso!"
        });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Disculpe, el rol \`${req.body.roles[i]}\` no existe`
        });
        return;
      }
    }
  }

  next();
};

checkUsernameOrEmail = (req, res, next) => {
  // verificamos que exista el nombre de usuario
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user) {
      res.status(400).send({
        message: "Nombre de usuario o email no identificado"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (!user) {
        res.status(400).send({
          message: "Nombre de usuario o email no identificado"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkUsernameOrEmail
};

module.exports = verifySignUp;
