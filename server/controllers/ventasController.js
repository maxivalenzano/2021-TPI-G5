const Venta = require("../models/VentaModel");

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

const getAllVentas = async (request, response) => {
  const ventas = await Venta.find({});

  try {
    response.send(ventas);
  } catch (error) {
    response.status(500).send(error);
  }
};

const addVenta = async (request, response) => {
  if (!request.body) {
    response.status(400).send("No tiene body");
    return;
  }

  const venta = new Venta(request.body);

  try {
    await venta.save();
    response.send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

const getVentaByID = async (request, response) => {
  const venta = await Venta.findById(request.params.id);

  try {
    response.send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

const modifyByID = async (request, response) => {
  try {
    const venta = await Venta.findByIdAndUpdate(
      request.params.id,
      request.body
    );
    await venta.save();
    response.send(venta);
  } catch (error) {
    response.status(500).send(error);
  }
};

const deleteByID = async (request, response) => {
  try {
    const venta = await Venta.findByIdAndDelete(request.params.id);

    if (!venta) response.status(404).send("La venta buscada no existe");
    response.status(200).send();
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
};
