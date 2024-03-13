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

  // it('Login error', () => {
    
  //   cy.visit('/login')

  //   cy.intercept('POST', '/api/auth/login', {
  //     body: {
  //       id: 1,
  //       username: 'userName',
  //       firstName: 'firstName',
  //       lastName: 'lastName',
  //       admin: true
  //     },
  //   })

  //   cy.get('input[formControlName=email]').clear()
  //   cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

  //   cy.url().should('include', '/login')
  //     // TODO : voir ce que je peux tester d'autre ? 
  // });

});