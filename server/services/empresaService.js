const { EmpresaRepository, SecretariaRepository } = require("../repository");

const empresaRepository = new EmpresaRepository();
const secretariaRepository = new SecretariaRepository();

class EmpresaService {

    /**
     * Registrar una empresa en el Ministerio
     * @returns empresaRegistered
     */
    async registerEmpresa(infoEmpresa) {
        const response = await empresaRepository.registerEmpresa(infoEmpresa);
        return response;
    }

    /**
     * Obtener todos los reportes de la empresa
     * @returns 
     */
    async getAllReportes() {
        const reportes = await empresaRepository.getReportes();
        return reportes;
    }

    /**
     * Enviar un reporte al Ministerio
     * @param {*} venta 
     * @returns 
     */
    async addNewReporte(reporte) {
        const nuevoReporte = new ReporteMensual(reporte);
        const response = await empresaRepository.sendReportes(nuevoReporte);
        return response;
    }

    /**
     * Checkea el estado de la empresa en Secretaria
     * @param {cuit} cuit 
     * @returns 
     */
    async checkEstado(cuit) {
        const response = await secretariaRepository.checkEstadoSecretaria(cuit);
        return response;
    }
}

module.exports = EmpresaService;