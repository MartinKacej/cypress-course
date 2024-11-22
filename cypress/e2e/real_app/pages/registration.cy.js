export default class signUpPage {
    visit(){
        cy.visit('http://localhost:3000/signup')
    }
    firstNameField(){
        return cy.get('#firstName')
    }
    lastNameField(){
        return cy.get('#lastName')
    }
    usernameField(){
        return cy.get('#username')
    }
    passwordField(){
        return cy.get('#password')
    }
    passwordConfField(){
        return cy.get('#confirmPassword')
    }
    signUpButton(){
        return cy.get('[data-test="signup-submit"]')
    }
    signUpUser(fName,lName,username,pass){
        this.firstNameField().type(fName)
        this.lastNameField().type(lName)
        this.usernameField().type(username)
        this.passwordField().type(pass)
        this.passwordConfField().type(pass)
        this.signUpButton().click({force:true})
    }
    signInLink(){
        return cy.get('.MuiGrid-root > a')
    }
    isSumbitDisabled(){
        this.signUpButton().should('be.disabled')
    }
}
