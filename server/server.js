require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express'), 
swaggerDocument = require('./swagger.json');
const port = process.env.PORT;

const libreria = require("dacs-integrador-g5");

const mockRoutes = require("./server/routes/mockRoutes");
const externalRoutes = require("./server/routes/externalRoutes");
const ventaRoutes = require("./server/routes/ventasRoutes");
const userRoutes = require("./server/routes/userRoutes");
const authRoutes = require("./server/routes/authRoutes");

const app = express();

var corsOp = {
  origin: [
    `http://localhost:${port}`,
    `http://localhost:3000`,
    `http://localhost:3001`,
    `https://rotiseria-los-cracks.netlify.app`
  ],
};

app.use(cors(corsOp));

const { url } = require("./config/db.config.js");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// database MySQL
// const db = require("./server/models/sequelize");
// const Role = db.role;
// db.sequelize.sync({ force: true }).then(() => {
//   console.log('Conectado a Sequelize');
//   initial();
// });

const { url } = require("./server/config/db.config.js");
const mongoose = require("mongoose");

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// app.use("/api", require("./server/routes/index"));
app.use("/api", mockRoutes);
app.use("/", externalRoutes);
app.use("/", ventaRoutes);

// routes auth
app.use("/", userRoutes)
app.use("/", authRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`La RotiseriApp is up & running at http://localhost:${port}`);
});

// (async () => {
//   let autenticado = await libreria.getTokenDeMinisterio(
//     "http://localhost:8081/token",
//     "cracks",
//     "cracks"
//   );
//   // .then(res => {
//   //   console.log(res);
//   // })
//   // .catch(error => {
//   //   console.log(error);
//   // });
//   console.log("autenticado? ");
//   console.log(autenticado);
// })();

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user"
//   });

//   Role.create({
//     id: 2,
//     name: "mod"
//   });

//   Role.create({
//     id: 3,
//     name: "admin"
//   });
// }
