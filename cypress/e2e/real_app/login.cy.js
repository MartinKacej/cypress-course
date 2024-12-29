/// <reference types="Cypress"/>
import LoginPage from "./pages/login.cy"
describe('Try to sign with invalid credentials', () => {

    Cypress.config('baseUrl','http://localhost:3000/signin')
    
    const loginPage = new LoginPage()

    beforeEach("Visit Login page", () => {
        loginPage.visit()
    })
 
    it('Empty credentials', () => {
        cy.wait(500)
        loginPage.userField().clear()
        loginPage.passField().clear()
        loginPage.submitButton().should('be.disabled')
        loginPage.userWarning().should('be.visible')
        
    })
    
    it('Empty password', () => {
        loginPage.userField().type('test')
        loginPage.passField().clear()
        loginPage.userWarning().should('not.exist')
        loginPage.submitButton().should('be.disabled')
    })
    
    it('Short password', () => {
        loginPage.userField().type('test')
        loginPage.passField().type("t")
        loginPage.passField().blur()
        loginPage.submitButton().should('be.disabled')
        loginPage.passWarning().should('exist') 
    })
    
    it('Non existent user', () => {
        cy.db_reset()
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
        cy.db_reset()
        loginPage.rememberCheck().check()
        loginPage.signIn("invalid","invalid")
        cy.wait(200)
        cy.getCookie("connect.sid").should("not.exist")
        cy.wait(200)
        loginPage.rememberCheck().check()
        loginPage.signIn("Dina20","s3cret")
        cy.contains('New') // wait for page to load, cookie is stored after that
        cy.getCookie("connect.sid").should("have.property", "expiry")
    })

    it('Check registration link', ()=> {
        loginPage.regLink().click()
        cy.url().should('equal','http://localhost:3000/signup')
    })
})
