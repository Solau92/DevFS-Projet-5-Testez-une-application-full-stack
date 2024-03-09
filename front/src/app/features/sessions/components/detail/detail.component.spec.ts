import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule, } from '@angular/router/testing';
import { expect } from '@jest/globals'; 
import { SessionService } from '../../../../services/session.service';

import { DetailComponent } from './detail.component';
import { SessionApiService } from '../../services/session-api.service';
import { some } from 'cypress/types/bluebird';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


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

  // TODO : tester constructeur ? et comment ? 

  // TODO : comment tester back() ? 

  it('should delete session', () => {
    
    // TODO : à compléter 

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "delete").mockImplementation(() => new Observable<any>());

    // Comment tester le .subscribe ?
    //const sessionApiServiceMock2 = jest.spyOn(sessionApiService.delete, "subscribe") //

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.delete();

    expect(sessionApiServiceMock).toHaveBeenCalled();

    // Marche pas, comment tester ? + idemn sur ligne 51
    //expect(routerMock).toHaveBeenCalledWith(['sessions']);
  });

  it('should add participation', () => {

    // TODO : voir si ok et tester .subscribe comme au-dessus 

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "participate").mockImplementation(() => new Observable<void>());

    component.participate();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

  it('should remove participation', () => {

    // TODO : voir si ok et tester .subscribe comme au-dessus 
    
    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "unParticipate").mockImplementation(() => new Observable<void>());

    component.unParticipate();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

});

