export default class createBankAccount {
    bankName(){
        return cy.get('#bankaccount-bankName-input')
    }
    routNumber(){
        return cy.get('#bankaccount-routingNumber-input')
    }
    accNumber(){
        return cy.get('#bankaccount-accountNumber-input')
    }
    saveButton(){
        return cy.get('[data-test="bankaccount-submit"]')
    }
    nextButton() {
        return cy.get('[data-test="user-onboarding-next"]')
    }
    createBankAccount(name, routNumber, accNumber){
        this.bankName().type(name)
        this.routNumber().type(routNumber)
        this.accNumber().type(accNumber)
        this.saveButton().click()
    }
}
