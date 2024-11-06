const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
      testIsolation: true,
      video:false,
      defaultCommandTimeout: 1000,
      watchForFileChanges: false, 
  },
});
