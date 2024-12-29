/// <reference types="Cypress"/>
export default class UserSettings {
	visit() {
		cy.visit('http://localhost:3000/user/settings')
	}
	name() {
		return cy.get('[data-test="user-settings-firstName-input"]')
	}
	nameWarning() {
		return cy.get('#user-settings-firstName-input-helper-text')
	}
	surname() {
		return cy.get('[data-test="user-settings-lastName-input"]')
	}
	surnameWarning() {
		return cy.get('#user-settings-lastName-input-helper-text')
	}
	email() {
		return cy.get('[data-test="user-settings-email-input"]')
	}
	emailWarning() {
		return cy.get('#user-settings-email-input-helper-text')
	}
	phoneNumber() {
		return cy.get('[data-test="user-settings-phoneNumber-input"]')
	}
	phoneWarning() {
		return cy.get('#user-settings-phoneNumber-input-helper-text')
	}
	saveButton() {
		return cy.get('[data-test="user-settings-submit"]')
	}
}
