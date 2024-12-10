/// <reference types="Cypress"/>
import LoginPage from "./pages/login.cy"

describe('Check that RealWorld app is running', () => {

    it('Assert URL', () => {
        cy.exec('pgrep -f node.*cypress-realworld-app').its('stdout').should('not.equal', '')
        cy.visit('localhost:3000')
        cy.title().should('contain','Cypress Real World App')
    })
})

describe('Try to sign with invalid credentials', () => {

    Cypress.config('baseUrl','http://localhost:3000/signin')
    
    const loginPage = new LoginPage()

    beforeEach("Visit logon page", () => {
        loginPage.visit()
    })
 
    it('Empty credentials', () => {
        cy.wait(500)
        loginPage.userField().clear()
        loginPage.passField().clear()
        loginPage.submit()
        loginPage.userWarning().should('be.visible')
        
    })
    
    it('Empty password', () => {
        loginPage.userField().type('test')
        loginPage.userWarning().should('not.exist')
        loginPage.submitButton().should('be.disabled')
    })
    
    it('Short password', () => {
        loginPage.signIn("test","t")
        loginPage.submitButton().should('be.disabled')
        loginPage.passWarning().should('exist') 
    })
    
    it('Non existent user', () => {
        cy.intercept('POST','/login').as('req')
        loginPage.signIn("test","test")
        loginPage.passWarning().should('not.exist') 
        cy.url().should('equal','http://localhost:3000/signin')
        cy.get('.MuiAlert-message').contains('Username or password is invalid')
        cy.wait('@req').then((request) => {
            cy.log(request)
            expect(request.response.statusCode).eq(401)
            }
        )
    })

    it('Remember me cookie', () => {
        loginPage.rememberCheck().check()
        loginPage.signIn("invalid","invalid")
        cy.wait(200)
        cy.getCookie("connect.sid").should("not.exist")
        cy.wait(200)
        loginPage.rememberCheck().check()
        loginPage.signIn("Allie2","s3cret")
        cy.wait(200)
        cy.getCookie("connect.sid").should("have.property", "expiry")
    })

    it('Check registration link', ()=> {
        loginPage.regLink().click()
        cy.url().should('equal','http://localhost:3000/signup')
    })
})
