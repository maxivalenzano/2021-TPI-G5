const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    cuit:{
        type: String,
        unique: true,
        required: true
    },
    razon_social:{
        type: String
    }

})

const Empresa = mongoose.model("Empresa", empresaSchema);
module.exports = Empresa;