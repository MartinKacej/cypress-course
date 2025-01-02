export default class createBankAccount {
	bankName() {
		return cy.get('#bankaccount-bankName-input')
	}
	bankNameWarning() {
		return cy.get('#bankaccount-bankName-input-helper-text')
	}
	routNumber() {
		return cy.get('#bankaccount-routingNumber-input')
	}
	routNumberWarning() {
		return cy.get('#bankaccount-routingNumber-input-helper-text')
	}
	accNumber() {
		return cy.get('#bankaccount-accountNumber-input')
	}
	accNumberWarning() {
		return cy.get('#bankaccount-accountNumber-input-helper-text')
	}
	saveButton() {
		return cy.get('[data-test="bankaccount-submit"]')
	}
	nextButton() {
		return cy.get('[data-test="user-onboarding-next"]')
	}
	createBankAccount(name, routNumber, accNumber) {
		this.bankName().type(name)
		this.routNumber().type(routNumber)
		this.accNumber().type(accNumber)
		this.saveButton().click()
	}
}
