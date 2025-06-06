/// <reference types="Cypress"/>
import LoginPage from './pages/login.cy'
import bankAccounts from './pages/bank_account'
import createBankAccount from './pages/create_bank'

describe('Check create bank page', () => {
	const settings = new bankAccounts()
	const bankPage = new createBankAccount()
	beforeEach(() => {
		const login = new LoginPage()
		cy.db_reset()
		login.visit()
		login.signIn('Dina20', 's3cret')
		cy.contains('New', { timeout: 3000 }) // wait for succesfull login
		settings.visit()
		settings.createButton().click()
	})
	it('Check Bank name field', () => {
		bankPage.bankName().clear()
		bankPage.bankName().blur()
		bankPage.bankNameWarning().should('be.visible')

		bankPage.bankName().type('test')
		bankPage.bankNameWarning().should('be.visible')

		bankPage.bankName().clear()
		bankPage.bankName().type('test5')
		bankPage.bankNameWarning().should('not.exist')
	})
	it('Check routing number field', () => {
		bankPage.routNumber().clear()
		bankPage.routNumber().blur()
		bankPage.routNumberWarning().should('be.visible')

		bankPage.routNumber().type('123xx')
		bankPage.routNumberWarning().should('be.visible')

		bankPage.routNumber().clear()
		bankPage.routNumber().type('1234567890')
		bankPage.routNumberWarning().should('be.visible')

		bankPage.routNumber().clear()
		bankPage.routNumber().type('123465798')
		bankPage.routNumberWarning().should('not.exist')
	})
	it('Check routing number field', () => {
		bankPage.accNumber().clear()
		bankPage.accNumber().blur()
		bankPage.accNumberWarning().should('be.visible')

		bankPage.accNumber().type('12345678')
		bankPage.accNumberWarning().should('be.visible')

		bankPage.accNumber().clear()
		bankPage.accNumber().type('12345678901234')
		bankPage.accNumberWarning().should('be.visible')

		bankPage.accNumber().clear()
		bankPage.accNumber().type('1234657989TE')
		bankPage.accNumberWarning().should('not.exist')
	})
	it('Create new bank account', () => {
		cy.intercept('POST', '/graphql').as('req')
		bankPage.createBankAccount('TEST5', '123456789', '123-456-78')
		cy.wait('@req').then((req) => {
			cy.log(req)
			expect(req.request.body.variables.accountNumber).eq('123-456-78')
			expect(req.response.statusCode).eq(200)
		})
		settings.accountsList().find('li').should('have.length', 2)
	})
	it('Delete bank account', () => {
		let del_req_found = false
		bankPage.createBankAccount('TEST5', '123456789', '123-456-78')

		cy.intercept({ method: 'POST', path: '/graphql' }).as('req')
		settings.deleteAccount('TEST5')
		settings.accountsList().children().contains('TEST5 (Deleted)')
		// Multiple requests with same URL are made, wait 3 times for right one
		cy.wrap([1, 2, 3]).each(() => {
	    	cy.wait('@req').then((req) => {
	    		cy.log(req)
	    		if (req.request.body.operationName == 'DeleteBankAccount') {
	    			del_req_found = true
	    			expect(req.response.statusCode).eq(200)
	    		}
	    		cy.log(del_req_found)
	    	})
		}).then(() => expect(del_req_found, 'Delete request found').eq(true))
	})
})
