exports.allAccess = (req, res) => {
  res.status(200).send("Contenido publico.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("Contenido del usuario.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Contenido de administrador.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Contenido del moderador.");
};
