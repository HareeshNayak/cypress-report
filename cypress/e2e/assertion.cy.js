describe('SauceDemo - All Types of Assertions', () => {
  beforeEach(() => {
    // Visit the SauceDemo login page before each test
    cy.visit('https://www.saucedemo.com/');
  });

  it('should check existence, visibility, attributes, classes, inputs, and error messages on login page', () => {
    // ===== Existence & Visibility =====
    cy.get('[data-test="username"]').should('exist');
    cy.get('[data-test="password"]').should('be.visible');

    // ===== Attribute Assertions =====
    cy.get('[data-test="username"]').should('have.attr', 'placeholder', 'Username');
    cy.get('[data-test="login-button"]').should('have.attr', 'type', 'submit');
    cy.get('[data-test="username"]').should('not.have.attr', 'readonly');

    // ===== CSS Class Assertions =====
    cy.get('[data-test="login-button"]').should('have.class', 'submit-button');
    cy.get('[data-test="login-button"]').should('not.have.class', 'inactive');

    // ===== Input Value Assertions =====
    cy.get('[data-test="username"]').type('wrong_user');
    cy.get('[data-test="username"]').should('have.value', 'wrong_user');

    // ===== Login Attempt with Wrong Credentials =====
    cy.get('[data-test="password"]').type('wrong_pass');
    cy.get('[data-test="login-button"]').click();

    // ===== Error Assertions =====
    cy.get('[data-test="error"]')
      .should('exist')
      .and('be.visible')
      .and('include.text', 'Epic sadface')
      .and('not.have.text', 'Login Successful');

    cy.get('#inventory_container').should('not.exist');
  });

  it('should check elements after successful login', () => {
    // ===== Successful Login =====
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // ===== Error should not exist =====
    cy.get('[data-test="error"]').should('not.exist');

    // ===== Inventory container exists and visible =====
    cy.get('#inventory_container').should('exist').and('be.visible');

    // ===== Text Content =====
    cy.get('.title')
      .should('have.text', 'Products')
      .and('include.text', 'Products')
      .and('not.have.text', 'Login Page');

    // ===== Length Assertions (products) =====
    cy.get('.inventory_item').should('have.length', 6);
    cy.get('.inventory_item').should('have.length.greaterThan', 3);
  });
});
