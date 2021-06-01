const { VentaService } = require("../services/");


const ventaService = new VentaService();

// denominacion
// codigo_ean
// cantidad_vend
// precio
// fecha

// get ventas
// post venta
// get venta

// delete venta
// put venta

/**
 * Para obtener todas las ventas
 * @param {resquest}  
 * @param {*} response 
 */
const getAllVentas = async (request, response) => {
  try {
    const ventas = await ventaService.getAllVentas();
    response.send(ventas);
  } catch (error) {
    response.status(500).send(error);
  }
};

/**
 * 
 * @param {*} request 
 * @param {*} response 
 * @returns 
 */
const addVenta = async (request, response) => {
  if ((Object.keys(request.body).length == 0)) {
    response.status(400).send("No se ha enviado información en el body");
    return;
  }

  try {
    const venta = await ventaService.addNewVenta(request.body);
    response.send(venta);
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

const getVentaByID = async (request, response) => {
  try {
    const venta = await ventaService.getVentaById(request.params.id);
    response.send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

const modifyByID = async (request, response) => {
  try {
    const venta = await ventaService.updateVenta(
      request.params.id,
      request.body
    );
    response.send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteByID = async (request, response) => {
  try {
    console.log("Estoy en delete!")
    const venta = await ventaService.deleteVentaById(request.params.id);

    if (venta == {}) response.status(404).send("La venta buscada no existe");
    response.status(200).send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

// const deleteAll = async (request, response) => {
//   try {
//     const venta = await Venta.deleteMany({});

//     if (!venta) response.status(404).send("No hay nada de comidas por acá");
//     response.status(200).send(`Se han borrado ${venta.deletedCount} comidas`);
//   } catch (error) {
//     response.status(500).send(error);
//   }
// };

module.exports = {
  addVenta,
  getAllVentas,
  getVentaByID,
  modifyByID,
  deleteByID,
}
