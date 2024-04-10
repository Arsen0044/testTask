const { expect } = require("chai")

class mainFlowPage {
    elements = {
        shoppingCardIcon: () => cy.getByDataTest('shopping-cart-link'),
        shoppingCardBandage: () => cy.getByDataTest('shopping-cart-badge'),
        checkOutButton: () => cy.getByDataTest('checkout'),
        firstNameField: () => cy.getByDataTest('firstName'),
        lastNameField: () => cy.getByDataTest('lastName'),
        zipPostalCodeField: () => cy.getByDataTest('postalCode'),
        countinueButton: () => cy.getByDataTest('continue'),
        finishButton: () => cy.getByDataTest('finish'),
        backHomeButton: () => cy.getByDataTest('back-to-products'),
        logOutSideBarButton: () => cy.getByDataTest('logout-sidebar-link')
    }

    provideFullFlow(){
        this.addItemsToCard('sauce-labs-bike-light', 'sauce-labs-backpack')
        this.verifyItemsAdded()
        this.clickCheckOutButton()
        this.fillupYourInformationPage()
        this.verifyPriceAndItems()
        this.completeCheckOut()
        this.provideLogout()
    }

    addItemsToCard(...items){
        cy.addItemsToCard(...items)
    }

    fillupYourInformationPage(){
        this.elements.firstNameField().type('Arsen')
        this.elements.lastNameField().type('Mydzyn')
        this.elements.zipPostalCodeField().type('12345')
        this.elements.countinueButton().click()
        cy.location('href').should('eq', 'https://www.saucedemo.com/checkout-step-two.html')
    }

    completeCheckOut(){
        this.elements.finishButton().click()
        cy.contains('Thank you for your order!')
        this.elements.backHomeButton().click()
        cy.location('href').should('eq', 'https://www.saucedemo.com/inventory.html')
    }

    provideLogout(){
        cy.get('button').contains('Open Menu').click()
        this.elements.logOutSideBarButton().click()
    }

    verifyItemsAdded(){
        this.elements.shoppingCardBandage().invoke('text').should('be.equal', '2')
        this.elements.shoppingCardIcon().click()
        cy.location('href').should('eq', 'https://www.saucedemo.com/cart.html')
        cy.contains('Sauce Labs Bike Light')
        cy.contains('Sauce Labs Backpack')
    }

    verifyPriceAndItems(){
        cy.contains('Sauce Labs Bike Light')
        cy.contains('Sauce Labs Backpack')
        this.verifyPrice()
    }

    verifyPrice(){
        cy.getByDataTest('inventory-item-price').then(list => {
            let sum = 0;
            for(let i of list){
                let price = parseFloat(i.textContent.replace('$', ''))
                sum += price
            }
            cy.getByDataTest('tax-label').invoke('text').then(price => {
                const taxPrice = parseFloat(price.replace('Tax: $', ''));
                sum += taxPrice;
            })
            cy.getByDataTest('total-label').invoke('text').then(price => {
                const totalPrice = parseFloat(price.replace('Total: $', ''));
                expect(totalPrice).to.equal(sum)
            })
        });
    }

    clickCheckOutButton(){
        this.elements.checkOutButton().click()
        cy.location('href').should('eq', 'https://www.saucedemo.com/checkout-step-one.html')
    }

}


module.exports = new mainFlowPage();