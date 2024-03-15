// /**
//  * @jest-environment jsdom
//  */

// import '@testing-library/jest-dom'
// import { getByRole, getByTestId, getByLabelText, getByPlaceholderText } from '@testing-library/dom'
// import userEvent from '@testing-library/user-event'

import { LoginComponent } from './login.component'
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { LoginRequest } from '../../interfaces/loginRequest.interface';

let component: LoginComponent;
let fixture: ComponentFixture<LoginComponent>;
let authService: AuthService;
let router: Router;

beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [LoginComponent],
        providers: [SessionService, AuthService],
        imports: [
            RouterTestingModule,
            BrowserAnimationsModule,
            HttpClientModule,
            MatCardModule,
            MatIconModule,
            MatFormFieldModule,
            MatInputModule,
            ReactiveFormsModule
        ]
    })
        .compileComponents();
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
});

describe('', () => {

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // it('should login success', () => {

    //     router = TestBed.inject(Router);
    //     const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    //     const loginRequest: LoginRequest = {
    //         email: 'email@test.com',
    //         password: 'password'
    //     }
    //     component.form.setValue(loginRequest);
    //     expect(component.form.valid).toBeTruthy;

    //     const button = fixture.nativeElement.querySelector("button");
    //     expect(button.disabled).toBeFalsy;

    //     component.submit();

    //     // expect(sessionServiceMock).toHaveBeenCalled();
    //     // expect(authServiceMock).toHaveBeenCalled();
    //     // expect(routerMock).toHaveBeenCalledWith(['/sessions']);
    //     //expect(routerMock).toHaveBeenCalled();

    // });

    // it('should login error', () => {

    //     const loginRequest: LoginRequest = {
    //         email: '',
    //         password: ''
    //     }
    //     component.form.setValue(loginRequest);
    //     expect(component.form.valid).toBeFalsy;

    //     const button = fixture.nativeElement.querySelector("button");
    //     expect(button.disabled).toBeTruthy;

    //     // component.submit();

    //     // expect(sessionServiceMock).toHaveBeenCalled();
    //     // expect(authServiceMock).toHaveBeenCalled();
    //     // expect(routerMock).toHaveBeenCalledWith(['/sessions']);

    // });

    // it('should -----------------', () => {

    //     // Récupérer page 
    //     // document.body.innerHTML = fixture.nativeElement;
    //     const page: HTMLElement = fixture.nativeElement;

    //     // const body: any = document.querySelector("body")

    //     //console.log(page.getElementsByClassName("login-form"))
    //     // userEvent.type(
    //     //     (page.getElementsByClassName("login-form"), 'Email'), 
    //     //     'myemail@email.com'
    //     // )

    //     // userEvent.click(getByRole(document.body, 'button'))

    //     // expect(getByRole(document.body, 'onError')).not.toBeVisible;
    //     expect(true).toBeTruthy;

    // })
});