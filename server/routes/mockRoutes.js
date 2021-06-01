const express = require("express");
const router = express.Router();

const {
  getBusinessState,
  postSalesReport,
  postLogin,
  postSignUp,
} = require("../controllers/mockController");

router.get("/secretaria", getBusinessState);

router.post("/ministerio", postSalesReport);
router.post("/login", postLogin);
router.post("/signup", postSignUp);

//app.delete("/ventas");

module.exports = router;
