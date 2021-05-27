const mongoose = require("mongoose");

reporteMensualSchema = new mongoose.Schema({
    infoEmpresa: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Business",
        required: true
    },
    listaDeRegistros: [
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