/// <reference types="Cypress"/>
export default class Transaction {
	visit() {
		cy.visit('http://localhost:3000/transaction/new')
	}
	contactsList() {
		return cy.get('[data-test="users-list"]')
	}
	contactByName(name) {
		return cy.get('[data-test="users-list"] > li').find(name).click()
	}
	contactByPosition(pos) {
		return cy.get('[data-test="notifications-list"] > li').eq(pos)
	}
	searchBar() {
		return cy.get('[data-test="user-list-search-input"]')
	}
	paymentAmountField() {
		return cy.get('#amount')
	}
	paymentError() {
		return cy.get('#transaction-create-amount-input-helper-text')
	}
	paymentNoteField() {
		return cy.get('#transaction-create-description-input')
	}
	noteError() {
		return cy.get('#transaction-create-description-input-helper-text')
	}
	requestButton() {
		return cy.get('[data-test="transaction-create-submit-request"]')
	}
	payButton() {
		return cy.get('[data-test="transaction-create-submit-payment"]')
	}
	returnToTransactionsButton() {
		return cy.get('[data-test="new-transaction-return-to-transactions"]')
	}
	anotherTransaction() {
		return cy.get('[data-test="new-transaction-create-another-transaction"]')
	}
}
