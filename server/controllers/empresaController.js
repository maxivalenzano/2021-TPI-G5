const { EmpresaService } = require("../services/");


const empresaService = new EmpresaService();

/**
 * Obtener todos los reportes
 * @param {resquest}  
 * @param {*} response 
 */
const getReportes = async (request, response) => {
  try {
    const reportes = await empresaService.getAllReportes(
      request.header('email'),
      request.header('secret')
    );
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
  let respuesta;
  if ((Object.keys(request.body).length == 0)) {
    response.status(400).send("No se ha enviado información en el body");
    return;
  }

  try {
    respuesta = await empresaService.addNewReporte(
      request.header('email'),
      request.header('secret'),
      request.body);
  } catch (error) {
    response.status(500).send(error);
  }
  response.status(200).send(respuesta);
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

/**
 * Check estado de la empresa en secretaria
 * @param {request} request 
 * @param {response} response 
 */
const checkStatus = async (request, response) => {
  try {
    const estado = await empresaService.checkEstado(
      request.header('email'),
      request.header('secret'),
      request.body);
    response.send(estado);
  } catch (error) {
    response.status(500).send(error);
  }
}


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
  registerEmpresa,
  sendReporte,
  getReportes,
  checkStatus
}
