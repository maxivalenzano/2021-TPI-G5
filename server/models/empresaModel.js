const mongoose = require('mongoose');

const empresaSchema = new mongoose.Schema({
    cuit:{
        type: String,
        unique: true,
        required: true
    },
    nombre:{
        type:String
    },
    razon_social:{
        type: String
    }

})

const Empresa = mongoose.model("Empresas", EmpresaSchema);
module.exports = Empresa;