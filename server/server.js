require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express'), 
swaggerDocument = require('./swagger.json');
const port = process.env.PORT;

const libreria = require("dacs-integrador-g5");

const mockRoutes = require("./routes/mockRoutes");
const externalRoutes = require("./routes/externalRoutes");
const ventaRoutes = require("./routes/ventasRoutes");

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