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
        return cy.get('.PrivateSwitchBase-input-14')
    }
    submitButton(){
        return cy.get('.MuiButton-label').contains('Sign In').parent()
    }
    submit(){
        cy.get('.MuiButton-label').contains('Sign In').parent().click({force:true})
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
