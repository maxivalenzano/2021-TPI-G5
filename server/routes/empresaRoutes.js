const express = require("express");
const app = express();

const {
    registerEmpresa,
    sendReporte,
    getReportes,
} = require("../controllers/empresaController")

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

app.get(
    "/api/reports",
    getReportes
);

app.post(
    "/api/register",
    registerEmpresa
)

app.post(
    "/api/reports",
    sendReporte
)

module.exports = app;