const mongoose = require("mongoose");

//Fui poniendo lo que crei necesario, si algo esta mal cambienlo. Puede fallar xd
productoSchema = new mongoose.Schema({
    codigo_ean: {
        type: String,
        required: true,
        trim: true,
      },
    precio: {
       type: Number,
      required: true,
      min: 1,  
    },
    vencimiento:{
        type: Date
    },
    categoria:{
        type: String,
        required: true
      },
    descripcion:{
        type: String
    },
    stock:{
        type: Number,
        required: true
    }
});

const Producto = mongoose.model("Producto", ProductoSchema);
module.exports = Producto;