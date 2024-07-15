class CalcularFretePage {
    
    informarCepdeOrigem(postcode) {
      cy.get('#originPostcode').type(postcode);
    }
  
    selectFormatoCaixaPacote(formato) {
      cy.get('#object_format').click();
      cy.get(`[data-value="${formato}"]`).click(); // 1 = Caixa / Pacote
    }
  
    selecionarPeso(peso) {
      cy.get('#weight').click();
      cy.get(`[data-value="${peso}"]`).click();
    }
  
    informarAltura(altura) {
      cy.get('#packageHeight').type(altura);
    }
        
    informarLargura(largura) {
      cy.get('#packageWidth').type(largura);
    }      
    
    informarComprimento(comprimento) {
      cy.get('#packageDepth').type(comprimento);
    }    
    
    informarCepDestino(cepdestino) {
      cy.get('#destinationPostcode').type(cepdestino);
    }
  
    clicarCalcularFreteDesconto() {
      cy.get('button').contains('CALCULAR FRETE COM DESCONTO').click();
    }
  
    validacaoOpçoesdeFrete() {
      cy.get('#calculator-package-type-PAC-container > .MuiGrid-grid-xs-2 > .MuiTypography-root', { timeout: 5000 })
        .should('be.visible')
        .contains('PAC');
      cy.get('#calculator-package-type-SEDEX-container > .MuiGrid-grid-xs-2 > .MuiTypography-root')
        .should('be.visible')
        .contains('SEDEX');
      cy.get('#calculator-package-type-Mini\\ Envios-container > .MuiGrid-grid-xs-2 > .MuiTypography-root')
        .should('be.visible')
        .contains('Mini Envios');
    }
  }
  
  export default CalcularFretePage;
  