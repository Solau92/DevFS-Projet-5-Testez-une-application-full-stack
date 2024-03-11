import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { Session } from '../../interfaces/session.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

describe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;
  let router: Router;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatSelectModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
        SessionApiService
      ],
      declarations: [FormComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init component, user is not admin', () => {

    // TODO : à faire 

    // router = TestBed.inject(Router);
    // const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    // component.ngOnInit();

    // expect(routerMock).toHaveBeenLastCalledWith(['/sessions']);

  });

  it('should init component, user is admin', () => {

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.ngOnInit();

    expect(routerMock).not.toHaveBeenLastCalledWith(['/sessions']);
  });


  it('should submit session form for creating a session', () => {

    // TODO : voir pourquoi .subscribe fonctionne pas 
    component.onUpdate = false;

    sessionApiService = TestBed.inject(SessionApiService);
    // const sessionApiServiceMock = jest.spyOn(sessionApiService, "create").mockImplementation(() => new Observable<Session>());
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "create").mockImplementation(() => of());

    // router = TestBed.inject(Router);
    // const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    // let matSnackBar = TestBed.inject(MatSnackBar);
    // const matSnackBarMock = jest.spyOn(matSnackBar, "open").mockImplementation();

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    // expect(matSnackBarMock).toHaveBeenCalled();
    // expect(routerMock).toHaveBeenCalledWith(['sessions']);

  });

  it('should submit session form for updating a session', () => {

    // TODO : voir compléter quand test précédent fait, pour faire fonctionner .subscribe
    component.onUpdate = true;

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "update").mockImplementation(() => new Observable<Session>());

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

});
