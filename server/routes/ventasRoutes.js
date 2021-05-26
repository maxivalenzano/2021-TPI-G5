const express = require("express");
const {
  getAllVentas,
  addVenta,
  getVentaByID,
  modifyByID,
  deleteByID,
} = require("../controllers/VentasController");
const app = express();

app.get("/ventas", getAllVentas);

app.get("/ventas/:id", getVentaByID);

app.post("/ventas", addVenta);

app.patch("/ventas/:id", modifyByID);

app.delete("/ventas/:id", deleteByID);

app.delete("/ventas");

module.exports = app;
