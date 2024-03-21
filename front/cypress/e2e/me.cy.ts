describe('Me tests', () => {

    it('should display user information', () => {

        // User login

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 2,
                username: 'userName2',
                firstName: 'firstName2',
                lastName: 'lastName2',
                admin: false
            },
        })

        cy.intercept(
            {
                method: 'GET',
                url: '/api/session',
            },
            []).as('session')

        cy.get('input[formControlName=email]').type("user1@email.com")
        cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

        // Click on "Account"

        const user2 = {
            id: 2,
            email: 'user1@email.com',
            lastName: 'lastName2',
            firstName: 'firstName2',
            admin: false,
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        cy.intercept('GET', '/api/user/2', user2)

        cy.contains('Account').click()

        // Verify 

        cy.url().should('include', '/me')

        cy.contains('user1@email.com')
        cy.contains('firstName2')

        cy.get('button').should('be.visible')

    });

    it('should display admin information', () => {

        // Admin login

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'Admin',
                firstName: 'Admin',
                lastName: 'Admin',
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

        // Click on "Account"

        const admin = {
            id: 1,
            email: 'yoga@studio.com',
            lastName: 'Admin',
            firstName: 'Admin',
            admin: true,
            password: 'test!1234',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        cy.intercept('GET', '/api/user/1', admin)

        cy.contains('Account').click()

        // Verify 

        cy.url().should('include', '/me')
        cy.contains('yoga@studio.com')
        cy.contains('You are admin')
        cy.get('button').not('be.visible')

    });

    it('should delete user information', () => {

         // User login

         cy.visit('/login')

         cy.intercept('POST', '/api/auth/login', {
             body: {
                 id: 2,
                 username: 'userName2',
                 firstName: 'firstName2',
                 lastName: 'lastName2',
                 admin: true
             },
         })
 
         cy.intercept(
             {
                 method: 'GET',
                 url: '/api/session',
             },
             []).as('session')
 
         cy.get('input[formControlName=email]').type("user1@email.com")
         cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)
 
         // Click on "Account"
 
         const user2 = {
             id: 2,
             email: 'user1@email.com',
             lastName: 'lastName2',
             firstName: 'firstName2',
             admin: false,
             password: 'password',
             createdAt: new Date(),
             updatedAt: new Date()
         }
 
         cy.intercept('GET', '/api/user/2', user2)
 
         cy.contains('Account').click()

         // Delete 

         cy.intercept('GET', '/')

         cy.intercept('DELETE', '/api/user/2', user2)

         cy.contains('Detail').click()
 
         // Verify 

         cy.url().should('include', '/')
         cy.contains('Login')
 
    });

});