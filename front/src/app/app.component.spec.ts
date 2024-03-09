import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';

import { AppComponent } from './app.component';
import { SessionService } from './services/session.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

describe('AppComponent', () => {

  let sessionService: SessionService;
  let router: Router;

  let component: AppComponent; // ajouté


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule
      ],
      declarations: [
        AppComponent
      ],

    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent); // ajouté 
    component = fixture.componentInstance; // ajouté 

  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should return true as the user is logged', () => {

    // TODO : vérifier que OK
    // Je mocke mon session service
    sessionService = TestBed.inject(SessionService);

    // Je dis qu'il doit renvoyer true
    const expectedResponse: Observable<boolean> = new BehaviorSubject(true);
    const sessionServiceMock = jest.spyOn(sessionService, "$isLogged").mockImplementation(() => expectedResponse);

    // Je vérifie 
    expect(component.$isLogged()).toBeTruthy;

  });

  it('should return false as the user is not logged', () => {

    // TODO : vérifier que OK
    // Je mocke mon session service
    sessionService = TestBed.inject(SessionService);

    // Je dis qu'il doit renvoyer false
    const expectedResponse: Observable<boolean> = new BehaviorSubject(false);
    const sessionServiceMock = jest.spyOn(sessionService, "$isLogged").mockImplementation(() => expectedResponse);

    // Je vérifie 
    expect(component.$isLogged()).toBeFalsy;

  });

  it('should log out', () => {

    // TODO : vérifier que OK
    sessionService = TestBed.inject(SessionService);
    const sessionServiceMock = jest.spyOn(sessionService, "logOut").mockImplementation();

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.logout();

    expect(sessionServiceMock).toHaveBeenCalled();
    expect(routerMock).toHaveBeenCalledWith(['']);

  })

});
