const express = require("express");
const router = express.Router();
// Archivo para centralizar el exportaje de las rutas
const {
  getBusinessState,
  postSalesReport,
  getToken,
  postLogin,
} = require("../controllers/index");

router.get("/secretaria", getBusinessState);

router.post("/ministerio", postSalesReport);
router.get("/token", getToken);
router.post("/login", postLogin);

module.exports = router;
