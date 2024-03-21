describe('Page not found tests', () => {

    it('should display error page when url is incorrect', () => {

        // Try to navigate to a wrong url 

        cy.visit('/wrongurl')

        // Verify 

        cy.contains('Page not found !')
        cy.url().should('eq', 'http://localhost:4200/404')

    });

});