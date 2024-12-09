/// <reference types="Cypress"/>
export default class NavBar {
    open(){
        cy.get('[data-test="sidenav"]').should('be.visible')
        cy.get('[data-test="sidenav-toggle"]').click()
    }
    getNavButton(){
        return cy.get('[data-test="sidenav-toggle"]')
    }
    getBalance(){
       return cy.get('[data-test="sidenav-user-balance"]')
    }
    getName(){
        return cy.get('[data-test="sidenav-user-full-name"]')
    }
    getUsername(){
        return cy.get('[data-test="sidenav-username"]')
    }
    getHomeButton(){
        return cy.get('[data-test="sidenav-home"]')
    }
    getMyAccButton(){
        return cy.get('[data-test="sidenav-user-settings"]')
    }
    getBankAccs(){
        return cy.get('[data-test="sidenav-bankaccounts"]')
    }
    logout(){
        cy.get('[data-test="sidenav-signout"]').click()
    }
    getNotifications(){
        return cy.get('[data-test="nav-top-notifications-link"]')
    }
    getNotificationsAmount(){
        return cy.get('[data-test="nav-top-notifications-count"]').find('span') 
    }
    newTransaction(){
        return cy.get('[data-test="nav-top-new-transaction"]')
    }
}
