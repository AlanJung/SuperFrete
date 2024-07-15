const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1366,
    viewportHeight: 768,
    defaultCommandTimeout: 10000, // 10 segundos de timeout padrão
    setupNodeEvents(on, config) {
      // Eventos globais podem ser configurados aqui
    },
    supportFile: 'cypress/support/e2e.js',
  },
});
