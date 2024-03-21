describe('List tests', () => {

    it('should create a session (admin)', () => {

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

        // Click on "Create"

        const teachers = [{
            id: 1,
            lastName: 'teacher1LastName',
            firstName: 'teacher1FirstName',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: 2,
            lastName: 'teacher2LastName',
            firstName: 'teacher2FirstName',
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ]

        cy.intercept('GET', '/api/teacher', teachers)

        cy.contains('Create').click()

        // Verify (display of form)

        cy.contains('Create session')
        cy.get('button[type="submit"]').should('be.disabled')

        // Completion of fields  

        cy.get('input[formControlName="name"]').type("my yoga session")
        cy.get('input[formControlName="date"]').type("2024-03-18")
        cy.get('mat-select[formControlName="teacher_id"]')
            .first().click()
            .get('mat-option').contains('1')
            .click();
        cy.get('textarea[formControlName="description"]').type("this is a new yoga session")

        // Verify (display of form)

        cy.get('button[type="submit"]').should('not.be.disabled')

        // Click on save 

        cy.intercept('POST', '/api/session', {
            body: {
                name: "my yoga session",
                date: "2024-03-18",
                teacher_id: 1,
                description: "this is a new yoga session"
            }
        })

        const sessionsUpdated = [{
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
        },
        {
            id: 3,
            name: "my yoga session",
            date: "2024-03-18T08:00:00.000+00:00",
            teacher_id: 1,
            description: "this is a new yoga session",
            users: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }]

        cy.intercept('GET', '/api/session', {
            body: sessionsUpdated
        })

        cy.contains('Save').click()

        // Verify (new session in the list of sessions) 

        cy.url().should('include', 'sessions')
        cy.contains('this is a new yoga session')

    });

    it('should update a session (admin)', () => {
        
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

        const session1 = {
            id: 1,
            name: "session1",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 1",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        }

        const sessions = [session1,
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

        // Click on "Update"

        const teacher1 = {
            id: 1,
            lastName: 'teacher1LastName',
            firstName: 'teacher1FirstName',
            createdAt: new Date(),
            updatedAt: new Date()
        }

        const teachers = [          
            teacher1,
        {
            id: 2,
            lastName: 'teacher2LastName',
            firstName: 'teacher2FirstName',
            createdAt: new Date(),
            updatedAt: new Date()
        }]

        cy.intercept('GET', '/api/teacher/1', teacher1)
        cy.intercept('GET', '/api/session/1', session1)
        cy.intercept('GET', '/api/teacher', teachers)

        cy.contains('Edit').click()

        // Verify (display of form)

        cy.contains('Update session')

        // Update of fields  

        cy.get('input[formControlName="name"]').type("my session 1 updated")
        cy.get('input[formControlName="date"]').type("2024-03-18")
        cy.get('mat-select[formControlName="teacher_id"]')
            .first().click()
            .get('mat-option').contains('1')
            .click();
        cy.get('textarea[formControlName="description"]').type("session 1 updated")

        // Verify (form already filled)

        cy.get('button[type="submit"]').should('not.be.disabled')

        // Click on save 

        cy.intercept('PUT', '/api/session/1', {
            body: {
                name: "my session 1 updated",
                date: "2024-03-18",
                teacher_id: 1,
                description: "session 1 updated"
            }
        })

        const session1updated = {
            id: 1,
            name: "my session 1 updated",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 1 updated",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: new Date()
        }

        const sessionsUpdated = [session1updated]

        cy.intercept('GET', '/api/session', {
            body: sessionsUpdated
        })

        cy.contains('Save').click()

        // Verify (display of updates)

        cy.url().should('include', 'sessions')
        cy.contains('my session 1 updated')

    });
    
});