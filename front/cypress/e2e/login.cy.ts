describe('Login spec', () => {

  it('Login successfull', () => {

    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      body: {
        id: 1,
        username: 'userName',
        firstName: 'firstName',
        lastName: 'lastName',
        admin: true
      },
    })

    cy.intercept(
      {
        method: 'GET',
        url: '/api/session',
      },
      []).as('session')

    cy.get('input[formControlName=email]').type("yoga@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/sessions')

  });

  it('Login error : bad credentials', () => {

    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 401,
      body: {
        message: "Bad credentials"
      },
    })

    cy.get('input[formControlName=email]').type("wrongEmail@studio.com")
    cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

    cy.url().should('include', '/login')
    cy.get('.error').should('be.visible')
    
  });

  it('Login error : invalid form', () => {

    cy.visit('/login')

    cy.intercept('POST', '/api/auth/login', {
      statusCode: 400,
      body: {
      },
    })

    cy.get('input[formControlName=email]').clear()
    cy.get('input[formControlName=password]').clear()

    cy.url().should('include', '/login')
    cy.get('button[type="submit"]').should('be.disabled')

  });

});