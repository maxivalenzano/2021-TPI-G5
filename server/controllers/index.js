const { ExternalService } = require("../services/");

const externalService = new ExternalService();

// Archivo para centralizar el exportaje de los controllers
const users = ["Y3JhY2tzOmNyYWNrcw==", "sancor@gmail.com"];
const userTokens = ["tokenardo"];

const getBusinessState = (req, res) => {
  let respuesta;
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!userTokens.includes(token)) {
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
  } catch (error) {
    console.log(error);
  }

  res.json(respuesta);
};

const postSalesReport = (req, res) => {
  try {
    let token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.json("Error de Token");
    }
    let response = {
      msg: "Solo devolvemos lo recibido",
      content: req.body,
    };
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

const postLogin = (req, res) => {
  // ellos estan usando el body en un post
  const user = req.body.email;
  // console.log(req.headers.authorization);
  // let user = req.headers.authorization.split(" ")[1];
  let respuesta = { autenticado: false };
  if (users.includes(user)) {
    respuesta = {
      autenticado: true,
      token: "tokenardo",
    };
  }
  res.json(respuesta);
};

const getToken = (req, res) => {
  let user = req.headers.authorization.split(" ")[1];
  let token;
  if (users.includes(user)) {
    token = "tokenardo";
  }
  res.json(token);
};

const postSignUp = (req, res) => {
  // reciben todo esto
  //   {
  // "cuit": 20304050605,
  //   "Razon_social": "empresa fantasma 123",
  //   "Industria": "Lacteos",
  //   "email": "example@gmail.com",
  //   "tel": 3482668855,
  //   "password": "password",
  //   "ciudad": "Resistencia"
  // }

  const { email, password } = req.body;

  if (users.includes(email)) {
    res.send({ error: "usuario ya existente" });
  }

  users.push(email);
  res.send(`usuario ${email} creado`);

  // const encodedBase64Token = Buffer.from(`${username}:${password}`).toString(
  //   "base64"
  // );

  // hashearlo
  // verificar que se encuentre
  // guardar el nuevo o rechazar
  // asociar token
  // devolverlogggggggggggggggggggggggggggggg
};

module.exports = {
  postSalesReport,
  getBusinessState,
  getToken,
  postLogin,
  postSignUp,
};
