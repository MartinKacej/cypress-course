/// <reference types="Cypress"/>
export default class NavBar {
    open(){
        cy.get('[data-test="sidenav"]').should('be.visible')
        cy.get('[data-test="sidenav-toggle"]').click()
    }
    navButton(){
        return cy.get('[data-test="sidenav-toggle"]')
    }
    balance(){
       return cy.get('[data-test="sidenav-user-balance"]')
    }
    name(){
        return cy.get('[data-test="sidenav-user-full-name"]')
    }
    username(){
        return cy.get('[data-test="sidenav-username"]')
    }
    hmeButton(){
        return cy.get('[data-test="sidenav-home"]')
    }
    myAccButton(){
        return cy.get('[data-test="sidenav-user-settings"]')
    }
    bankAccs(){
        return cy.get('[data-test="sidenav-bankaccounts"]')
    }
    logout(){
        cy.get('[data-test="sidenav-signout"]').click()
    }
    notifications(){
        return cy.get('[data-test="nav-top-notifications-link"]')
    }
    notificationsAmount(){
        return cy.get('[data-test="nav-top-notifications-count"]').find('span') 
    }
    newTransaction(){
        return cy.get('[data-test="nav-top-new-transaction"]')
    }
}
