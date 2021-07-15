const { secretariaUrl, ministerioUrl } = require("../config/dependencies.config");
const grupo5lib = require("dacs-integrador-g5");

class SecretariaRepository {

    async checkEstadoSecretaria(email, secret, cuit) {
        const urlLogin = ministerioUrl + "/api/login";
        const urlEstado = secretariaUrl + "/notifications/" + cuit;
        let response;
        try {
          const token = await grupo5lib.iniciarSesionMinisterio(
            urlLogin,
            email,
            secret
          );
          if (token) {
            response = await grupo5lib.consultarEstadoASecretaria(
                urlEstado,
                token
            )
          }
          return response;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = SecretariaRepository;
