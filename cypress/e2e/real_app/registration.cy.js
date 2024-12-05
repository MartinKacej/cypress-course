/// <reference types="Cypress"/>
import signUpPage from "./pages/registration.cy"

describe('Check that RealWorld app is running', () => {

    it('Assert URL', () => {
        cy.exec('pgrep -f node.*cypress-realworld-app').its('stdout').should('not.equal', '')
        cy.visit('localhost:3000')
        cy.title().should('contain','Cypress Real World App')
    })
})

describe('Test Sign Up page', () => {
    const regPage = new signUpPage()

    beforeEach('Go to sign up page', () => regPage.visit() )
    
    it('Check first name field', () => {
        regPage.firstNameField().clear()
        regPage.signUpButton().click({force:true})
        cy.get('#firstName-helper-text').should('be.visible')
        regPage.firstNameField().type('first name')
        regPage.signUpButton().click({force:true})
        cy.get('#firstName-helper-text').should('not.exist')
    })

    it('Check last name field', () => {
        regPage.lastNameField().clear()
        regPage.signUpButton().click({force:true})
        cy.get('#lastName-helper-text').should('be.visible')
        regPage.lastNameField().type('test last name')
        regPage.signUpButton().click({force:true})
        cy.get('#lastName-helper-text').should('not.exist')
    })
})
