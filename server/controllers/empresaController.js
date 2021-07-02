const { EmpresaService } = require("../services/");


const empresaService = new EmpresaService();

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
 * Obtener todos los reportes
 * @param {resquest}  
 * @param {*} response 
 */
const getReportes = async (request, response) => {
  try {
    const reportes = await empresaService.getAllReportes();
    response.send(reportes);
  } catch (error) {
    response.status(500).send(error);
  }
};

/**
 * Enviar un reporte al Ministerio
 * @param {*} request 
 * @param {*} response 
 * @returns reporte
 */
const sendReporte = async (request, response) => {
  if ((Object.keys(request.body).length == 0)) {
    response.status(400).send("No se ha enviado información en el body");
    return;
  }

  try {
    await empresaService.addNewReporte(request.body);
    response.status(200).send("Reporte enviado con éxito!");
  } catch (error) {
    console.log(error);
    response.status(500).send(error);
  }
};

/**
 * Registrar una empresa en el Ministerio
 * @param {*} request 
 * @param {*} response 
 */
const registerEmpresa = async (request, response) => {
  try {
    const empresaRegistrada = await empresaService.registerEmpresa(request.body);
    response.send(empresaRegistrada);
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
