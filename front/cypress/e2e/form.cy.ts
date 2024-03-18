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

        // Affichage des sessions 

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
        //cy.intercept('GET', '/api/session/create')

        cy.contains('Create').click()

        // Verify (affichage form)

        cy.contains('Create session')
        cy.get('button[type="submit"]').should('be.disabled')

        // Remplissage des champs 

        cy.get('input[formControlName="name"]').type("my yoga session")
        cy.get('input[formControlName="date"]').type("2024-03-18")
        cy.get('mat-select[formControlName="teacher_id"]')
            .first().click()
            .get('mat-option').contains('1')
            .click();
        cy.get('textarea[formControlName="description"]').type("this is a new yoga session")

        // Verify (affichage form)

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

        // Verify (affichage de la nouvelle session sur la page list 

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

        // Affichage de la session

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

        const sessions = [{
            session1
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

        const teachers = [{
            teacher1
        },
        {
            id: 2,
            lastName: 'teacher2LastName',
            firstName: 'teacher2FirstName',
            createdAt: new Date(),
            updatedAt: new Date()
        }]

        cy.intercept('GET', '/session/detail/1', session1)
        cy.intercept('GET', '/api/teacher/1', teacher1)
        cy.intercept('GET', '/api/session/1', session1)

        cy.contains('Edit').click()

        // **************** TODO ****************

        // Verify (affichage form)

        cy.contains('Update session')
        // TODO : voir si je vérifie autre chose 

        // Modification des champs 

        // TODO : voir si faut .clear() avant de modifier ? 
        cy.get('input[formControlName="name"]').type("my yoga session updated")
        cy.get('input[formControlName="date"]').type("2024-03-18")
        cy.get('mat-select[formControlName="teacher_id"]')
            .first().click()
            .get('mat-option').contains('1')
            .click();
        cy.get('textarea[formControlName="description"]').type("this is a new yoga session updated")

        // Verify (affichage form)

        cy.get('button[type="submit"]').should('not.be.disabled')

        // Click on save 

        cy.intercept('POST', '/api/session', {
            body: {
                name: "my yoga session updated",
                date: "2024-03-18",
                teacher_id: 1,
                description: "this is a new yoga session updated"
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
            name: "my yoga session updated",
            date: "2024-03-18T08:00:00.000+00:00",
            teacher_id: 1,
            description: "this is a new yoga session updated",
            users: [],
            createdAt: new Date(),
            updatedAt: new Date()
        }]

        cy.intercept('GET', '/api/session', {
            body: sessionsUpdated
        })

        cy.contains('Save').click()

        // Verify (affichage de la nouvelle session sur la page list 

        cy.url().should('include', 'sessions')
        cy.contains('this is a new yoga session updated')

    });
});