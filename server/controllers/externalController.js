const libreria = require("dacs-integrador-g5");
// const url = process.env.HOST_URL || "";
const url = "http://localhost:8000";
const urlMinisterio = url + "/api/ministerio";
const urlSecretaria = url + "/api/secretaria";
const urlLogin = url + "/api/login";

const usuario = "usuario";
const contra = "contra";

const postReports = async (req, res) => {
  let reporteMensual = req.body.reporte || { ejemplo: "ejemplo" };
  let respuesta;
  try {
    const token = await libreria.iniciarSesionMinisterio(
      urlLogin,
      req.body.email,
      req.body.password
    );
    if (token) {
      respuesta = await libreria.sendReportesAlMinisterio(
        urlMinisterio,
        reporteMensual,
        token
      );
    }
    res.json(respuesta);
  } catch (error) {
    console.log(error);
  }
};

const getSecretaryStatus = async (req, res) => {
  const { token } = await libreria.iniciarSesionMinisterio(
    urlLogin,
    req.body.email,
    req.body.password
  );
  let estado = await libreria.consultarEstadoASecretaria(urlSecretaria, token);
  res.send(estado);
};

module.exports = { postReports, getSecretaryStatus };
