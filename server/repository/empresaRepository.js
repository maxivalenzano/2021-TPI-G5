const { ministerioUrl } = require("../config/dependencies.config");
const ministerioCli = require("dacs-integrador-g5");

class EmpresaRepository {

  /**
   * Registrar la empresa dentro del sistema del Ministerio
   * @param {} data 
   * @returns 
   */
  async registerEmpresa(infoEmpresa) {
    console.log("registerEmpresa");
    const urlSignup = ministerioUrl + "/api/signup"
    try {
      const response = await ministerioCli.registroMinisterio(urlSignup, infoEmpresa);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Obtener todos los reportes de la empresa
   * @returns 
   */
  async getReportes(email, secret) {
    console.log("getReportes");
    const urlLogin = ministerioUrl + "/api/login";
    const urlReports = ministerioUrl + "/api/reports"
    let response;
    try {
      const token = await ministerioCli.iniciarSesionMinisterio(
        urlLogin,
        email,
        secret,
      );
      if (token) {
        response = await ministerioCli.getReportesMinisterio(
          urlReports,
          token
        )
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Enviar reporte al ministerio
   * @param {*} reporteMensual 
   * @returns 
   */
  async sendReportes(email, secret, reporteMensual) {
    console.log("sendReportes");
    const urlLogin = ministerioUrl + "/api/login";
    const urlReports = ministerioUrl + "/api/reports";
    let respuesta = [];
    try {
      const token = await ministerioCli.iniciarSesionMinisterio(
        urlLogin,
        email,
        secret
      );
      if (token) {
        respuesta = await ministerioCli.sendReportesAlMinisterio(
          urlReports,
          reporteMensual,
          token
        )
      }
      return respuesta;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

}

module.exports = EmpresaRepository;