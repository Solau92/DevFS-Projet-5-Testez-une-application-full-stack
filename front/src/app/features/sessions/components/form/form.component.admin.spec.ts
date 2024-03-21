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
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

describe('FormComponent user is admin', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;
  let router: Router;
  let matSnackBar: MatSnackBar;

  const mockSessionService = {
    sessionInformation: {
      admin: true
    }
  }

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: () => '1'
      },
      url: 'url/update'
    }
  };

  const routerMock = {
    navigate: jest.fn(),
    url: 'url/update'
  };

  const session1: Session = {
    id: 1,
    name: 'session1',
    description: 'session 1',
    date: new Date(),
    teacher_id: 1,
    users: [1, 2]
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: routerMock },
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

  it('should init component, user is admin and update', () => {

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "detail").mockReturnValue(of(session1));

    component.ngOnInit();

    expect(component.onUpdate).toEqual(true);
    expect(sessionApiServiceMock).toHaveBeenCalled();
  });

  it('should submit session form for creating a session', () => {

    component.onUpdate = false;

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "create").mockReturnValue(of(session1));

    matSnackBar = TestBed.inject(MatSnackBar);
    const matSnackBarMock = jest.spyOn(matSnackBar, "open").mockImplementation();

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    expect(matSnackBarMock).toHaveBeenCalled();
    expect(routerMock).toHaveBeenCalledWith(['sessions']);

  });

  it('should submit session form for updating a session', () => {

    component.onUpdate = true;

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "update").mockReturnValue(of(session1));

    matSnackBar = TestBed.inject(MatSnackBar);
    const matSnackBarMock = jest.spyOn(matSnackBar, "open").mockImplementation();

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    expect(matSnackBarMock).toHaveBeenCalled();
    expect(routerMock).toHaveBeenCalledWith(['sessions']);

  });

});
