//// Tests of registration //// 

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

//// Tests of login and logout //// 

describe('Login tests', () => {

    it('Login successfull', () => {

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'userName',
                firstName: 'firstName',
                lastName: 'lastName',
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

});

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

    it('should delete user information', () => {

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

//// Tests of logout //// 

describe('Log out tests', () => {

    it('Log out successfully', () => {

        cy.visit('/login')

        cy.intercept('POST', '/api/auth/login', {
            body: {
                id: 1,
                username: 'userName',
                firstName: 'firstName',
                lastName: 'lastName',
                admin: false
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





