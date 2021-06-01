const express = require("express");
const router = express.Router();

const {
  getSecretaryStatus,
  postReports,
} = require("../controllers/externalController");

router.post("/secretaria", getSecretaryStatus);

router.post("/ministerio", postReports);

//app.delete("/ventas");

module.exports = router;
