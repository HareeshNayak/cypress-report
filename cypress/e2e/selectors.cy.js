describe('SauceDemo - Cart Functionality', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
    });

    it('should check elements after successful login and add item to cart', () => {
        // ===== Successful Login =====
        cy.get('[data-test="username"]').should('be.visible').type('standard_user');
        cy.get('[data-test="password"]').should('be.visible').type('secret_sauce');
        cy.get('[data-test="login-button"]').should('be.visible').click();

        // ===== Error should not exist =====
        cy.get('[data-test="error"]').should('not.exist');

        // ===== Inventory container exists and visible =====
        cy.get('#inventory_container').should('exist').and('be.visible');

        // ===== Text Content =====
        cy.get('.title')
          .should('have.text', 'Products')
          .and('include.text', 'Products')
          .and('not.have.text', 'Login Page');
    });
});