import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { expect } from '@jest/globals';

import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        ReactiveFormsModule,  
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register with success', () => {
    
    // TODO : vérifier que ok 

    authService = TestBed.inject(AuthService);
    const authServiceMock = jest.spyOn(authService, "register").mockImplementation(() => new Observable<void>());

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async ()=> true);
    
    component.submit();

    expect(authServiceMock).toHaveBeenCalled();
    // expect(routerMock).toHaveBeenCalledWith(['/login']);
  });

  it('should return error when trying to register', () => {
    
    // TODO 
    
  });

});
