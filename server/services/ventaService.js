const { Venta } = require("../models/index");

class VentaService {

    async getAllVentas() {
        const ventas = await Venta.find();
        return ventas;
    }

    async addNewVenta(venta) {
        console.log("Estoy en addVenta")
        const nuevaVenta = new Venta(venta);
        await nuevaVenta.save();
        return nuevaVenta;
    }

    async getVentaById(ventaId) {
        const venta = await Venta.findById(ventaId);
        return venta || {};
    }

    async updateVenta(ventaId, venta) {
        const ventaActualizada = await Venta.findByIdAndUpdate(
            ventaId,
            venta
        )
        await ventaActualizada.save();
        return ventaActualizada || {};
    }

    async deleteVentaById(ventaId) {
        console.log("Estoy en deleteById")
        await Venta.findByIdAndDelete(ventaId);
        return ventaId || {};
    }

}

module.exports = VentaService;