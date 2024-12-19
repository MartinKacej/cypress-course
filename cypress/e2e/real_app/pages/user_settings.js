/// <reference types="Cypress"/>
export default class UserSettings {

    visit(){
        cy.visit('http://localhost:3000/user/settings')
    }
    getName(){
        return cy.get('[data-test="user-settings-firstName-input"]') 
    }
    getNameWarning(){
        return cy.get('#user-settings-firstName-input-helper-text')
    }
    getSurname(){
        return cy.get('[data-test="user-settings-lastName-input"]')
    }
    getSurnameWarn(){
        return cy.get('#user-settings-lastName-input-helper-text')
    }
    getEmail(){
        return cy.get('[data-test="user-settings-lastName-input"]')
    }
    getEmailWarn(){
        return cy.get('#user-settings-email-input-helper-text')
    }
    getPhoneNum(){
        return cy.get('[data-test="user-settings-phoneNumber-input"]')
    }
    getPhoneWarn(){
        return cy.get('#user-settings-phoneNumber-input-helper-text')
    }
    getSaveButton(){
        return cy.get('[data-test="user-settings-submit"]')
    }
}
