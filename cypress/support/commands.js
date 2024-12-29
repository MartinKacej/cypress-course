// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --

//const {method} = require("cypress/types/bluebird")

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('db_reset', () => {
    cy.request('POST',"http://localhost:3001/testdata/seed").its('status').should('eq',200)
})

Cypress.Commands.add("loginByAPI",(user, pass)=>{
    cy.request(  "POST", "http://localhost:3001/login",{ "username":user, "password":pass}).its('status').should('eq',200)
})
