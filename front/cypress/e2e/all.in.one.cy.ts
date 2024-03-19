//// Tests of detail page //// 

describe('Detail tests', () => {

    it('should display the details of a session for user', () => {

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

        const teacher1 = {
            id: 1,
            lastName: "teacher1LastName",
            firstName: "teacher1FirstName",
            createdAt: new Date(),
            updatedAt: new Date()
        }

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

        const session2 = {
            id: 2,
            name: "session2",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 2",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        }

        const sessions = [session1, session2]

        cy.intercept('GET', '/api/session', {
            body: sessions
        }).as("getsession")

        cy.get('input[formControlName=email]').type("user1@email.com")
        cy.get('input[formControlName=password]').type(`${"password"}{enter}{enter}`)

        // Display of the first session (click on "Detail")

        cy.intercept('GET', '/api/session/1', {
            body: session1
        })

        cy.intercept('GET', '/api/teacher/1', {
            body: teacher1
        })

        cy.contains('Detail').click()

        // Verify 

        cy.url().should('include', 'sessions/detail/1')
        cy.contains('attendees')
        cy.contains('Session1')
        cy.contains('Delete').should('not.exist')
        cy.contains('Participate').should('be.visible')

    });

    it('should display the details of a session for admin', () => {

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

        const teacher1 = {
            id: 1,
            lastName: "teacher1LastName",
            firstName: "teacher2FirstName",
            createdAt: new Date(),
            updatedAt: new Date()
        }

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

        const session2 = {
            id: 2,
            name: "session2",
            date: "2024-04-05T08:00:00.000+00:00",
            teacher_id: 1,
            description: "session 2",
            users: [],
            createdAt: "2024-03-15T08:23:02",
            updatedAt: "2024-03-15T08:23:02"
        }

        const sessions = [session1, session2]

        cy.intercept('GET', '/api/session', {
            body: sessions
        })

        cy.get('input[formControlName=email]').type("yoga@studio.com")
        cy.get('input[formControlName=password]').type(`${"test!1234"}{enter}{enter}`)

        // Click on "Detail"

        cy.intercept('GET', '/session/detail/1', {
            body: session1
        })

        cy.intercept('GET', '/api/session/1', session1)
        cy.intercept('GET', '/api/teacher/1', teacher1)

        cy.contains('Detail').click()

        // Verify 

        cy.url().should('include', 'sessions/detail')
        cy.contains('attendees')
        cy.contains('Session1')
        cy.contains('Delete').should('be.visible')
        cy.contains('Participate').should('not.exist')
        cy.contains('Do not participate').should('not.exist')

    });

});


//// Tests of form page //// 

describe('Form tests', () => {

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

        // Verify (affichage form)

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

        // Verify (new session in the list ok sessions) 

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

        // Verify (affichage form)

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


//// Tests of list page //// 

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


//// Tests of login and logout //// 

describe('Login and log out tests', () => {

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

    it('Login and logout successfully', () => {

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

        cy.contains('Logout').click();

        cy.url().should('eq', 'http://localhost:4200/');

    });

});


//// Tests of me page //// 

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

        // cy.get('button').should('not.be.visible')
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


//// Tests of not found page //// 

describe('Page not found tests', () => {

    it('should display error page when url is incorrect', () => {

        cy.visit('/wrongurl')

        cy.contains('Page not found !')
        cy.url().should('eq', 'http://localhost:4200/404')

    });

});

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