const mongoose = require("mongoose");

registroVentaSchema = new mongoose.Schema({
    denominacion: {
        type: String,
        trim: true
    },
    codigoEan: {
        type: String,
        required: true,
        trim: true,
    },
    precioUnidad: {
        type: Number,
        required: true,
    },
    unidadMedida: {
        type: String,
        required: true,
    },
    cantidadProd: {
        type: Number,
        required: true
    },
    cantidadVendida: {
        type: Number,
        required: true
    }
})

const RegistroVenta = mongoose.model("RegistroVenta", registroVentaSchema);
module.exports = RegistroVenta;

