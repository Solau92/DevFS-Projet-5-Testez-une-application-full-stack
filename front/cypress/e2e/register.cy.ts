describe('Register spec', () => {

  it('Register successfull', () => {

    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      body: {
        id: 2,
        username: 'userName1',
        firstName: 'firstName1',
        lastName: 'lastName1',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/login',
      },
      []).as('login')

    cy.get('input[formControlName=firstName]').type("firstName2")
    cy.get('input[formControlName=lastName]').type("lastName1")
    cy.get('input[formControlName=email]').type("user1@test.com")
    cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/login')

  });

  it('Error of registration : missing fields', () => {

    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: {
      },
    })

    cy.get('input[formControlName=firstName]').clear()
    cy.get('input[formControlName=lastName]').clear()
    cy.get('input[formControlName=email]').clear()
    cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/register')
    cy.get('button[type="submit"]').should('be.disabled')

  });

  it('Error of registration : email already taker', () => {

    cy.visit('/register')

    cy.intercept('POST', '/api/auth/register', {
      statusCode: 400,
      body: {
        message: "Error: Email is already taken!"
      },
    })

    cy.get('input[formControlName=firstName]').type("firstName2")
    cy.get('input[formControlName=lastName]').type("lastName1")
    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

    cy.url().should('include', '/register')
    cy.get('.error').should('be.visible')

  });

});