/// <reference types="Cypress"/>

describe('Visit DemoQA webpage', () => {
    it('Assert URL', () => {
        cy.visit('http://demoqa.com')
        cy.title().should('contain','DEMOQA')
    })
})
