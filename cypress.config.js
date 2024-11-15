const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('file:preprocessor', cucumber())
    },
      specPattern: "cypress/e2e/cucumber-tests/*.feature",
      stepDefinitions: "cypress/integration",
      testIsolation: true,
      video:false,
      defaultCommandTimeout: 1000,
      watchForFileChanges: false, 
  },
});
