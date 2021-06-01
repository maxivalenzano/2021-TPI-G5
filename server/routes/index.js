const express = require("express");
const router = express.Router();
// Archivo para centralizar el exportaje de las rutas
const {
  getBusinessState,
  postSalesReport,
  postLogin,
  postSignUp,
} = require("../controllers/index");

router.get("/secretaria", getBusinessState);

router.post("/ministerio", postSalesReport);
router.post("/login", postLogin);
router.post("/singup", postSignUp);

module.exports = router;
