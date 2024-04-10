class loginPage {
    elements = {
        usernameField: () => cy.getByDataTest('username'),
        passwordField: () => cy.getByDataTest('password'),
        loginButton: () => cy.getByDataTest('login-button'),
        errorPopup: () => cy.getByDataTest('error'),
        inventoryList: () => cy.getByDataTest('inventory-list')
    }

    provideLoginFlow(username = 'standard_user', password = 'secret_sauce'){
        this.elements.usernameField().type(username)
        this.elements.passwordField().type(password)
        this.elements.loginButton().click()
    }

    verifyLoginSuccessful(){
        this.elements.inventoryList().should('be.visible')
    }

    verifyErrorPopUp(){
        this.elements.errorPopup().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    }

}


module.exports = new loginPage();