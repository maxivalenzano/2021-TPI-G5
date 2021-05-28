const express = require("express");
const cors = require("cors");
const port = 8081;

const secretaryRoutes = require("./server/routes/index");
const ventaRoutes = require("./server/routes/ventasRoutes");

const app = express();
var corsOp = { origin: "http://localhost:3000" }

app.use(cors(corsOp))

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

app.use("/", secretaryRoutes);
app.use("/", ventaRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
