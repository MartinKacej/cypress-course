/// <reference types="Cypress"/>

describe('Test Forms section of DEMOQA webpage', () => {

    // disabling failing on exceptions from bugged testing app
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    })

    beforeEach( () => {
        cy.visit('http://demoqa.com')
        cy.title().should('contain','DEMOQA')
        cy.wait(500)
        cy.get('.home-body').contains('Forms').click()
        cy.contains('Practice Form').click()
        cy.get('h1').should('contain','Practice Form')
    })

    it('Try to submit empty form', () => {
        cy.get('#submit').click({force:true})
        cy.get('#firstName').should('have.css', 'border-color', 'rgb(220, 53, 69)')
        cy.get('.modal-dialog').should('not.exist')
    })
 
    it('Try to fill form without phone number', () => {
        cy.fixture('users.json').as('testData').then((testData) => {
            const fName = testData[0]['name']
            const lName = testData[0]['username']
            cy.get('#firstName').type(fName)
            cy.get('#lastName').type(lName)
            cy.get('#gender-radio-3').click({force:true})
 
            cy.get('#submit').click({force:true})
            cy.get('.modal-dialog').should('not.exist')
        })
    })

    it('Fill form with invalid phone number', () => {
        cy.get('#firstName').type('test')
        cy.get('#lastName').type('test')
        cy.get('#gender-radio-3').click({force:true})

        cy.get('#userNumber').type('invalid') 
        cy.get('#submit').click({force:true})
        cy.get('.modal-dialog').should('not.exist')
        
        cy.get('#userNumber').clear()
        cy.get('#userNumber').type('123')
        cy.get('#submit').click({force:true})
        cy.get('.modal-dialog').should('not.exist') // i found a bug here, hehe

        cy.get('#userNumber').clear()
        cy.get('#userNumber').type('123456789012346579')
        cy.get('#userNumber').should('have.value','1234567890')
 
        cy.get('#submit').click({force:true})
        cy.get('.modal-dialog').should('exist')
    })


    describe('Test form with optional options', () => {

        beforeEach('Fill mandatory options', () => {
            cy.visit('https://demoqa.com/automation-practice-form')
            cy.get('h1').should('contain','Practice Form')
            cy.fixture('users.json').as('testData').then((testData) => {
                const fName = testData[0]['name']
                const lName = testData[0]['username']
                cy.get('#firstName').type(fName)
                cy.get('#lastName').type(lName)
                cy.get('#gender-radio-1').click({force:true})
                cy.get('#userNumber').type('1234567890')
            })
        })
    
        it('Test subject dropdown menu', () => {
            cy.get('#subjectsContainer').type('invalid')
            cy.get('#firstName').click()
            cy.get('#subjectsInput').should('be.empty')
            cy.get('#subjectsContainer').type('Math{enter}')
            cy.get('#subjectsContainer').type('Sc{downarrow}{enter}')
            cy.get('#subjectsContainer').type('Art{enter}')
            cy.get('#subjectsContainer').type('{backspace}')
            cy.get('#submit').click({force:true})
            cy.get('.modal-dialog').find('tr').contains('Subjects').parent().contains("Maths, Computer Science")
        })
 
        it('Check date of birth input', () => {
            //cy.get('#dateOfBirthInput').clear() //and another bug
            cy.get('#dateOfBirthInput').type('{selectAll}1.1.1999{downarrow}{downarrow}{downarrow}{enter}')
            cy.get('#submit').click({force:true})
            cy.get('.modal-dialog').find('tr').contains('Date of Birth').next().should('contain', '15 January,1999')
        })
    })
})
