import CalcularFretePage from '../pages/calcularfretepage';

describe('Fluxo calculo de frete com desconto - Testes positivos e negativos', () => {
  const calcularfretepage = new CalcularFretePage();

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('http://web.superfrete.com/');
    
  });

  it('Valida o fluxo principal de cálculo de frete', () => {
    calcularfretepage.informarCepdeOrigem('08090-284');
    calcularfretepage.selectFormatoCaixaPacote('1');
    calcularfretepage.selecionarPeso('0.3');
    calcularfretepage.informarAltura('2');
    calcularfretepage.informarLargura('11');
    calcularfretepage.informarComprimento('16');
    calcularfretepage.informarCepDestino('05407-002');
    calcularfretepage.clicarCalcularFreteDesconto();
    calcularfretepage.validacaoOpçoesdeFrete();
  });

  it('Deve exibir mensagem de erro ao não informar CEP de origem', () => {
    calcularfretepage.informarCepDestino('05407-002');
    calcularfretepage.clicarCalcularFreteDesconto();
    cy.get('#originPostcode-helper-text').should('contain', 'CEP de origem é obrigatório');
  });

  it('Deve exibir mensagem de erro ao não informar CEP de destino', () => {
    calcularfretepage.informarCepdeOrigem('08090-284');
    calcularfretepage.clicarCalcularFreteDesconto();
    cy.get('#destinationPostcode-helper-text').should('contain', 'CEP de destino é obrigatório');
  });

  it('Deve exibir mensagens de erro para dimensões inválidas', () => {
    calcularfretepage.informarCepdeOrigem('08090-284');
    calcularfretepage.selectFormatoCaixaPacote('1');
    calcularfretepage.selecionarPeso('0.3');
    calcularfretepage.informarAltura('0.3');    // Altura < 0.4 cm
    calcularfretepage.informarLargura('7');     // Largura < 8 cm
    calcularfretepage.informarComprimento('12');  // Comprimento < 13 cm
    calcularfretepage.informarCepDestino('05407-002');
    calcularfretepage.clicarCalcularFreteDesconto();
    cy.get('#packageHeight-helper-text').should('contain', 'Altura mínima é 0.4 cm');
    cy.get('#packageWidth-helper-text').should('contain', 'Largura mínima é 8 cm');
    cy.get('#packageDepth-helper-text').should('contain', 'Comprimento mínimo é 13 cm');
  });
});
