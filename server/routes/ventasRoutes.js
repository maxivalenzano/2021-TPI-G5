const express = require("express");
const {
  getAllVentas,
  addVenta,
  getVentaByID,
  modifyByID,
  deleteByID,
} = require("../controllers/ventasController")
const { authJwt } = require("../middleware");
  
const app = express();

app.get("/ventas", [authJwt.verifyToken], getAllVentas);

app.get("/ventas/:id", [authJwt.verifyToken], getVentaByID);

app.post("/ventas", [authJwt.verifyToken], addVenta);

app.patch("/ventas/:id", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], modifyByID);

app.delete("/ventas/:id", [authJwt.verifyToken, authJwt.isAdmin], deleteByID);

//app.delete("/ventas");

module.exports = app;
