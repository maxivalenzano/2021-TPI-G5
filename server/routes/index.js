const express = require("express");
const router = express.Router();
// Archivo para centralizar el exportaje de las rutas
const { getBusinessState } = require("../controllers/index");

router.get("/secretaria", getBusinessState);

module.exports = router;
