const mongoose = require("mongoose");

reporteMensualSchema = new mongoose.Schema({
    infoEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empresa",
        required: true
    },
    listaRegistro: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RegistroDeVenta",
            required: true
        },
    ],
    periodo: {
        year: {
            type: "String" // 2021
        },
        month: {
            type: "String" // 1
        }
    }
})

const ReporteMensual = mongoose.model("ReporteMensual", reporteMensualSchema);
module.exports = ReporteMensual;