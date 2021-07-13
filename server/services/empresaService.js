const { EmpresaRepository, SecretariaRepository } = require("../repository");
const { ReporteMensual } = require("../models/mongoose/index");

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
    async getAllReportes(email, secret) {
        const reportes = await empresaRepository.getReportes(email, secret);
        return reportes;
    }

    /**
     * Enviar un reporte al Ministerio
     * @param {*} venta 
     * @returns 
     */
    async addNewReporte(email, secret, reporte) {
        let response;
        let listaRegistroOk = reporte.listaRegistro.map(element => {
            return {
                denominacion: element.denominacion,
                codigo_ean: element.codigoEan,
                precio_unidad: element.precioUnidad,
                unidad_medida: element.unidadMedida,
                cantidad_prod: element.cantidadProd,
                cantidad_vend: element.cantidadVendida
            }
        });
        const reporteMinisterio = {
            ...reporte,
            listaRegistro: listaRegistroOk
        }
        try {
            response = await empresaRepository.sendReportes(email, secret, reporteMinisterio);
            return response;
        } catch (error) {
            return (error);
        }
    }

    /**
     * Checkea el estado de la empresa en Secretaria
     * @param {cuit} cuit 
     * @returns 
     */
    async checkEstado(email, secret, cuit) {
        const response = await secretariaRepository.checkEstadoSecretaria(email, secret, cuit);
        return response;
    }
}

module.exports = EmpresaService;