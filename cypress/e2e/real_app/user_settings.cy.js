/// <reference types="Cypress"/>
import LoginPage from './pages/login.cy'
import NavBar from './pages/navbar'
import UserSettings from './pages/user_settings'

describe('Check user settings page', () => {
	const settings = new UserSettings()
	const nav = new NavBar()

	beforeEach(() => {
		const login = new LoginPage()
		cy.db_reset()
		cy.intercept('PATCH', '/users/*').as('update_user')
		login.visit()
		login.signIn('Dina20', 's3cret')
		cy.contains('New') // wait for succesfull login
		settings.visit()
	})

	it('Check name fields', () => {
		settings.name().clear()
		settings.nameWarning().should('be.visible')
		settings.saveButton().should('be.disabled')

		settings.name().type('test')
		settings.nameWarning().should('not.exist')
		settings.saveButton().click()
		cy.wait('@update_user').then((req) => {
			expect(req.request.body.firstName).eq('test')
			expect(req.response.statusCode).eq(204)
		})
		nav.name().should('contain', 'test')

		settings.surname().clear()
		settings.surnameWarning().should('be.visible')
		settings.saveButton().should('be.disabled')

		settings.surname().type('Test')
		settings.surnameWarning().should('not.exist')
		settings.saveButton().click()
		cy.wait('@update_user').then((req) => {
			expect(req.request.body.firstName).eq('test')
			expect(req.response.statusCode).eq(204)
		})
		nav.name().invoke('text').should('eq', 'test T')
	})

	it('Check email field', () => {
		settings.email().clear()
		settings.emailWarning().should('be.visible')
		settings.saveButton().should('be.disabled')

		const mails = ['test', 'test.com', 'test@']
		cy.wrap(mails).each((m) => {
			settings.email().clear()
			settings.email().type(m)
			settings
				.emailWarning()
				.should('be.visible')
				.and('contain', 'Must contain a valid email address')
			settings.saveButton().should('be.disabled')
		})

		settings.email().clear()
		settings.email().type('test@test.com')
		settings.emailWarning().should('not.exist')
		settings.saveButton().should('be.enabled')
		settings.saveButton().click()
		cy.wait('@update_user').then((req) => {
			expect(req.request.body.email).eq('test@test.com')
			expect(req.response.statusCode).eq(204)
		})
	})

	it('Check phone number field', () => {
		settings.phoneNumber().clear()
		settings
			.phoneWarning()
			.should('be.visible')
			.and('contain', 'Enter a phone number')
		settings.saveButton().should('be.disabled')

		const bad_nums = ['12345,123-45', '-123456', '1234-56', 'XXX', '123-45X']
		cy.wrap(bad_nums).each((n) => {
			settings.phoneNumber().clear()
			settings.phoneNumber().type(n)
			settings
				.phoneWarning()
				.should('be.visible')
				.and('contain', 'Phone number is not valid')
			settings.saveButton().should('be.disabled')
		})

		const good_nums = ['123456', '123-456', '123-456-789']
		cy.wrap(good_nums).each((n) => {
			settings.phoneNumber().clear()
			settings.phoneNumber().type(n)
			settings.phoneWarning().should('not.exist')
			settings.saveButton().should('be.enabled')
		})
		settings.saveButton().click()
		cy.wait('@update_user').then((req) => {
			expect(req.request.body.phoneNumber).eq('123-456-789')
			expect(req.response.statusCode).eq(204)
		})
	})
})
