// Archivo para centralizar el exportaje de los controllers
exports.getBusinessState = (req, res) => {
  let incumpliendo = Math.round(Math.random() * 10) % 2;

  let respuesta = {
    incumpliendo: !!incumpliendo,
    alertas: [
      {
        nombre_alerta: "un nombre genricoso",
        descripcion_alerta: "una descripción genericosa",
        fecha_alerta: Date(),
      },
    ],
  };

  res.json(respuesta);
};
