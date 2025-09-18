describe('sauceDemo - Navigation Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('should navigate to the inventory page after successful login', () => {
        cy.get('#user-name').type('standard_user');
        cy.get('#password').type('secret_sauce');
        cy.get('#login-button').click();

        cy.url().should('include', '/inventory.html');
        cy.get('.title').should('have.text', 'Products');
        cy.get('.inventory_item').should('have.length', 6);
    });
});