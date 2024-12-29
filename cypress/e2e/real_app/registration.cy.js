/// <reference types="Cypress"/>
import signUpPage from './pages/registration.cy'
import LoginPage from './pages/login.cy'
import createBankAccount from './pages/create_bank'

describe('Test Sign Up page', () => {
	const regPage = new signUpPage()

	beforeEach('Go to sign up page', () => { 
        cy.db_reset()
        regPage.visit()
    })

	it('Check first name field', () => {
		regPage.firstNameField().clear()
		regPage.signUpButton().click({ force: true })
		regPage.helpTextFirstName().should('be.visible')
		regPage.firstNameField().type('first name')
		regPage.signUpButton().click({ force: true })
		regPage.helpTextFirstName().should('not.exist')
	})

	it('Check last name field', () => {
		regPage.firstNameField().type('test')
		regPage.lastNameField().clear()
		regPage.signUpButton().click({ force: true })
		regPage.helpTextLastName().should('be.visible')
		regPage.lastNameField().type('test last name')
		regPage.signUpButton().click({ force: true })
		regPage.helpTextLastName().should('not.exist')
	})

	it('Check password field', () => {
		regPage.passwordField().clear()
		regPage.signUpButton().click({ force: true })
		regPage.helpTextPassword().should('be.visible')
		regPage.passwordField().type('pa')
		regPage.signUpButton().click({ force: true })
		regPage.helpTextPassword().should('be.visible' && 'contain', '4 characters')
		regPage.passwordField().clear()
		regPage.passwordField().type('pass')
		regPage.helpTextPassword().should('not.exist')
	})

	it('Check password confirmation field', () => {
		regPage.passwordField().clear()
		regPage.passwordConfField().clear()
		regPage.signUpButton().click({ force: true })
		regPage.helpTextConfPassword().should('be.visible')
		regPage.passwordField().type('pass')
		regPage.signUpButton().click({ force: true })
		regPage
			.helpTextConfPassword()
			.should('be.visible' && 'contain', 'Confirm your password')
		regPage.passwordConfField().type('pa')
		regPage
			.helpTextConfPassword()
			.should('be.visible' && 'contain', 'Password does not match')
		regPage.passwordConfField().clear()
		regPage.passwordConfField().type('pass')
		regPage.helpTextConfPassword().should('not.exist')
	})

	it('Check sign in link', () => {
		regPage.signInLink().click()
		cy.url().should('contain', 'localhost:3000/signin')
	})

	it('Register and login user and check landing page', () => {
		const logPage = new LoginPage()

		cy.intercept('POST', '/users').as('reg')
		cy.fixture('real_app_user')
			.as('user')
			.then((user) => {
				regPage.signUpUser(
					user.first_name,
					user.last_name,
					user.username,
					user.password
				)
				logPage.signIn(user.username, user.password)

				cy.wait('@reg').then((request) => {
					expect(request.response.statusCode).eq(201)
				})
				const landPage = new createBankAccount()
				landPage.nextButton().click()
				landPage.createBankAccount('Testbank', '000000333', '123456789')
				landPage.nextButton().should('be.visible')
			})
	})
})
