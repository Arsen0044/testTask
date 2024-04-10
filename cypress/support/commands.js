// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getByDataTest', (dataTest) => {
    cy.get(`[data-test="${dataTest}"]`)
})

Cypress.Commands.add('addItemsToCard', (...items) => {
    for (let i of items){
        cy.getByDataTest(`add-to-cart-${i}`).click()
    }
})

Cypress.Commands.add('login', (username = 'standard_user', password = 'secret_sauce') => {
    cy.session([username, password], () => {
        cy.visit('/')
        cy.getByDataTest('username').type(username)
        cy.getByDataTest('password').type(password)
        cy.getByDataTest('login-button').click()
    },
    {
        cacheAcrossSpecs: true
    })
})