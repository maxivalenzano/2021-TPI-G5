// Archivo para centralizar el exportaje de los modelos
const Venta = require("./ventaModel");
const Producto = require("./productoModel");
const RegistroVenta = require("./registroVentaModel");
const ReporteMensual = require("./reporteMensual");

module.exports = { 
    Venta,
    Producto,
    RegistroVenta,
    ReporteMensual
};
