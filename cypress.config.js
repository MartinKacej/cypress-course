const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
        //
    },
      testIsolation: false,
      "video":false,
      "defaultCommandTimeout": 1000,
      "watchForFileChanges": false,
  },
});
