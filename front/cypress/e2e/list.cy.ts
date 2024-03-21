describe('List tests', () => {

    it('should display list of sessions for a user', () => {

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

        // Display of sessions 

        const sessions = [{
            id: 1,
            name: "session1",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 1",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        },
        {
            id: 2,
            name: "session2",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 2",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        }]

        cy.intercept('GET', '/api/session', {
            body: sessions
        })

        cy.get('input[formControlName=email]').type("user1@email.com")
        cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

        // Verify 

        cy.url().should('include', 'sessions')
        cy.contains('session2')
        cy.contains('session1')
        cy.should('not.contain', 'Create')
        cy.should('not.contain', 'Edit')

    });

    it('should display list of sessions for an admin', () => {

        // Admin login

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'userName2',
                firstName: 'firstName2',
                lastName: 'lastName2',
                admin: true
            },
        })

        // Display of sessions 

        const sessions = [{
            id: 1,
            name: "session1",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 1",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        },
        {
            id: 2,
            name: "session2",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 2",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        }]

        cy.intercept('GET', '/api/session', {
            body: sessions
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

        // Verify 

        cy.url().should('include', 'sessions')
        cy.contains('session2')
        cy.contains('session1')
        cy.contains('Create')
        cy.contains('Edit')

    });

});