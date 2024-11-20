/// <reference types="Cypress"/>

describe('DEMOQA REST API - Book Store app', () => {
    Cypress.config('baseUrl','https://demoqa.com/BookStore/v1')

    it( "GET - find one book by ISBN", () => {
        cy.fixture('books').then((book) => {
            cy.request('/Book?ISBN=' + book['isbn']).as('getBooks').its('status').should('eq',200)
            cy.get('@getBooks').its('body').as('resBody')
            cy.get('@resBody').its('isbn').should('eq',book['isbn'])
            cy.wrap(Object.keys(book)).each((key) => {
              cy.get('@resBody').its(key).should('eq',book[key])
            })
        })
    })
 
    it('GET - invalid book',()=>{
       cy.request({url:'/Book?ISBN=xxxx',failOnStatusCode: false}).as('getBooks').its('status').should('eq',400)
    })

    it('DELETE - delete invalid book', ()=>{
       cy.request({
           url:'/Books', 
           method:"DELETE", 
           failOnStatusCode: false,
           data:{
              "isbn": "XXXXX",
              "userId": "4589"
            }
       }).as('getBooks').its('status').should('eq',401)
    })
 
    it('POST - try to create new book without authorization', ()=>{
       cy.request({
           url:'/Books',
           failOnStatusCode: false,
           method: "POST",
           data:{
             "userId": "4589",
             "collectionOfIsbns": [
                {
                   "isbn": "9781449331818"
                 }
              ]
            }
       }).as('getBooks').its('status').should('eq',401)
    })
})
