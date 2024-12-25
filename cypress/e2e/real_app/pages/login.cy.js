/// <reference types="Cypress"/>
export default class LoginPage {
    visit(){
        cy.visit('http://localhost:3000/signin')
    }
    userField(){
       return cy.get('#username')
    }
    passField(){
        return cy.get('#password')
    }
    rememberCheck(){
        return cy.get('[data-test="signin-remember-me"]').get('[type="checkbox"]')
    }
    submitButton(){
        return cy.get('[data-test="signin-submit"]').contains('Sign In')
    }
    submit(){
        cy.get('[data-test="signin-submit"]').contains('Sign In').click()
    }
    userWarning(){
        return cy.get('#username-helper-text')
    }
    passWarning(){
        return cy.get('#password-helper-text')
    }
    signIn(user,pass){
        this.userField().type(user)
        this.passField().type(pass)
        this.submit()
    }
    regLink(){
        return cy.get('[data-test="signup"]')
    }
}
