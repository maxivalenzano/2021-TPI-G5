const express = require("express");
const port = 3000;

const secretaryRoutes = require("./server/routes/index");

const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
