import loginPage from "../pageObjects/loginPage"


describe('test login', () => {

  beforeEach(() => {
    cy.visit('/')
    cy.contains('Swag Labs').should('be.visible')
  })

  it('Login with valid credentials', () => {
    loginPage.provideLoginFlow()
    loginPage.verifyLoginSuccessful()
  })

  it('Login with invalid credentials', () => {
    loginPage.provideLoginFlow('dummy_user');
    loginPage.verifyErrorPopUp();
  })
})