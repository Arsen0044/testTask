import mainFlowPage from "../pageObjects/mainFlowPage";


describe("Adding items to Card", () => {
    it('flow', () => {
        cy.login()
        cy.visit('/')
        mainFlowPage.provideFullFlow();
    })
})