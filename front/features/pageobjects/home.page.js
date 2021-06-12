import Page from './page';
import { expect } from 'chai';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class HomePage extends Page {
  /**
   * define selectors using getter methods
   */
  get title() {
    return $("//h1[contains(text(),'Sistema de registro de ventas')]");
  }
  get btnReportGenerate() {
    return $("//span[contains(text(),'Generar reporte')]");
  }
  get btnSellRegister() {
    return $("//span[contains(text(),'Registrar Venta')]");
  }
  get btnCheckDebt() {
    return $("//span[contains(text(),'Consultar deuda')]");
  }
}

export default new HomePage();
