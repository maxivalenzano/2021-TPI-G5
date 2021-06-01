require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT;

const libreria = require("dacs-integrador-g5");

const secretaryRoutes = require("./server/routes/index");
const ventaRoutes = require("./server/routes/ventasRoutes");

const app = express();
var corsOp = {
  origin: [
    `http://localhost:${port}`,
    `http://localhost:3000`,
    `http://localhost:3001`,
  ],
};

app.use(cors(corsOp));

const { url } = require("./server/config/db.config.js");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use("/api", secretaryRoutes);
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
