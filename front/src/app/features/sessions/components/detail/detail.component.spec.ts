import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';
import { Teacher } from 'src/app/interfaces/teacher.interface';
import { TeacherService } from 'src/app/services/teacher.service';


describe('DetailComponent', () => {

  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>; 
  let service: SessionService;
  let sessionApiService: SessionApiService;
  let router: Router;

  const mockSessionService = {
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatSnackBarModule,
        ReactiveFormsModule
      ],
      declarations: [DetailComponent], 
      providers: [{ provide: SessionService, useValue: mockSessionService }],
    })
      .compileComponents();
      service = TestBed.inject(SessionService);
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go back', () => {

    const windowMock = jest.spyOn(window.history, 'back');
    
    component.back();

    expect(windowMock).toHaveBeenCalled();

  });

  it('should delete session', () => {

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "delete").mockImplementation(() => of({}));

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    let matSnackBar = TestBed.inject(MatSnackBar);
    const matSnackBarMock = jest.spyOn(matSnackBar, "open").mockImplementation();

    component.delete();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    expect(matSnackBarMock).toHaveBeenCalled();
    expect(routerMock).toHaveBeenCalledWith(['sessions']);

  });

  it('should add participation', () => {

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "participate").mockImplementation(() => of(undefined));

    component.participate();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

  it('should remove participation', () => {
    
    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "unParticipate").mockImplementation(() => of(undefined));

    component.unParticipate();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

  it('should init and fetch session', () => {

    const session1: Session = {
      id: 1,
      name: 'session1',
      description: 'session 1',
      date: new Date(),
      teacher_id: 1,
      users: [1, 2]
    }

    const teacher1: Teacher = {
      id: 1,
      lastName: "teacherLastName1",
      firstName: "teacherFirstName1",
      createdAt: new Date(),
      updatedAt: new Date()
    }

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "detail").mockReturnValue(of(session1));

    let teacherService = TestBed.inject(TeacherService);
    const teacherServiceMock = jest.spyOn(teacherService, "detail").mockReturnValue(of(teacher1));

    component.ngOnInit();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    expect(teacherServiceMock).toHaveBeenCalled();
    expect(component.session).toEqual(session1);
    expect(component.teacher).toEqual(teacher1);

  });

});

