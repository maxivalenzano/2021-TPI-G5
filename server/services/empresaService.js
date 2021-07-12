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
        console.log("PA VE QUE NOS TRAE");
        console.log(reporte);
        const reporteNuestro = {...reporte, 
            listaRegistro: [
                {
                    denominacion: reporte.listaRegistro[0].denominacion,
                    codigo_ean: reporte.listaRegistro[0].codigoEan,
                    precio_unidad: reporte.listaRegistro[0].precioUnidad,
                    unidad_medida: reporte.listaRegistro[0].unidadMedida,
                    cantidad_prod: reporte.listaRegistro[0].cantidadProd,
                    cantidad_vend: reporte.listaRegistro[0].cantidadVendida
                }
            ]
        }
        console.log("REPORTE NUESTRO");
        console.log(reporteNuestro);
        const response = await empresaRepository.sendReportes(email, secret, reporteNuestro);
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