// Archivo para centralizar el exportaje de los controllers
const users = ["Y3JhY2tzOmNyYWNrcw=="];
const userKeys = ["tokenardo"];

const getBusinessState = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  let respuesta;
  if (!userKeys.includes(token)) {
    respuesta = "no tenes un token valido";
  } else {
    let incumpliendo = Math.round(Math.random() * 10) % 2;

    respuesta = {
      incumpliendo: !!incumpliendo,
      alertas: [
        {
          nombre_alerta: "un nombre generico",
          descripcion_alerta: "una descripción generica",
          fecha_alerta: Date(),
        },
      ],
    };
  }

  res.json(respuesta);
};

const postSalesReport = (req, res) => {
  let response = {
    msg: "Solo devolvemos lo recibido",
    content: req.body,
  };
  res.json(response);
};

const postLogin = (req, res) => {
  // console.log(req.headers.authorization);
  let user = req.headers.authorization.split(" ")[1];
  let autenticado = false;

  if (users.includes(user)) {
    autenticado = true;
  }
  res.json(autenticado);
};

const getToken = (req, res) => {
  let user = req.headers.authorization.split(" ")[1];
  let token;
  if (users.includes(user)) {
    token = "tokenardo";
  }
  res.json(token);
};

module.exports = { postSalesReport, getBusinessState, getToken, postLogin };
