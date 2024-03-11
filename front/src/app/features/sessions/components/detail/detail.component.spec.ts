import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Session } from '../../interfaces/session.interface';


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

    // TODO : finir
    
    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "detail").mockImplementation(() => new Observable<Session>());

    // let teacher1: Teacher;
    // let teacherService: TeacherService = TestBed.inject(TeacherService);
    // const teacherServiceMock = jest.spyOn(teacherService, "detail").mockImplementation(() => of(teacher1));

    // let session1: Session;
    // component.session = session1;

    component.ngOnInit();

    expect(sessionApiServiceMock).toHaveBeenCalled();
    // expect(teacherServiceMock).toHaveBeenCalled();

  })

});

