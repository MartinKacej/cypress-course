import { defineStep } from "cypress-cucumber-preprocessor/steps";

defineStep("Open login page", () =>{
    cy.exec('pgrep -f node.*cypress-realworld-app').its('stdout').should('not.equal', '');
    cy.visit("http://localhost:3000/signin");
});
defineStep("I can see login form", () =>{
    cy.get("h1").contains("Sign in");
    cy.get("#username").should('be.visible');
    cy.get("#password").should('be.visible');
    cy.get('button[data-test="signin-submit"]').should('be.visible');
});
defineStep("Provide credentials of user {string} {string}", (username, pass) =>{
    cy.get("#username").type(username);
    cy.get("#password").type(pass);
});
defineStep("Sign in to app", () =>{
    cy.get('button[data-test="signin-submit"]').click(); 
});

