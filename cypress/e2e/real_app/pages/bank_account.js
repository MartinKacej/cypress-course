export default class bankAccounts {
	visit() {
		cy.visit('http://localhost:3000/bankaccounts')
	}
	createButton() {
		return cy.get('[data-test="bankaccount-new"]')
	}
	accountsList() {
		return cy.get('[data-test="bankaccount-list"]')
	}
	deleteAccount(name) {
		this.accountsList()
			.contains(name)
			.parent().parent()
			.find('[data-test="bankaccount-delete"]')
			.click()
	}
}
