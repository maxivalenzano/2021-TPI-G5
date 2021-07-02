const { ministerioUrl } = require("../config/ministerio.config");
const ministerioCli = require("dacs-integrador-g5");

class empresaRepository {

    async registrarEmpresa(data) {

        const url = ministerio_url + "/api/signup"
        try {
            const response = await ministerioCli.registroMinisterio(url, data);
        } catch(error) {
            console.log(error);
        }
        return response; 
    }

    async getAllReports() {
      const urlLogin = ministerio_url + "/api/login";
      const urlReports = ministerio_url

      try {
          const token = await ministerioCli.iniciarSesionMinisterio(
            url_login,
            data.email,
            data.password,
          );
          if (token) {
            return respuesta = await ministerioCli.getAllReports(

            )
          }

      } catch (error) {

      }
    }

    async postReports(reporteMensual) {
      const url_login = ministerio_url + "/api/login";
      const url_reports =  ministerio_url + "/api/reports";
        try {
            const token = await ministerioCli.iniciarSesionMinisterio(
                url_login,
                data.email,
                data.password
            );
            if (token) {
                return respuesta = await ministerioCli.sendReportesAlMinisterio(
                    url_reports,
                    reporteMensual,
                    token
                )
            }
            return respuesta = "{}";
        } catch (error) {
            console.log(error);
        }
    }


}

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
