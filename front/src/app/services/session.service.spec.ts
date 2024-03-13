import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionService } from './session.service';
import { SessionInformation } from '../interfaces/sessionInformation.interface';
import { Observable } from 'rxjs';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in', () => {

    const user: SessionInformation = {
      token: "token",
      type: "type",
      id: 1,
      username: "username",
      firstName: "firstName",
      lastName: "lastName",
      admin: false
    }

    service.logIn(user);

    expect(service.sessionInformation).toBeUndefined;
    expect(service.isLogged).toBeTruthy;

  });

  it('should log out', () => {

    service.logOut();

    expect(service.sessionInformation).toBe(undefined);
    expect(service.isLogged).toBeFalsy;

  });

  it('should return true as the user is logged', () => {

    service.isLogged = true;
    const isLoggedAsObservable: Observable<boolean> = service.$isLogged();
    expect(isLoggedAsObservable).toBeTruthy();

  });

  it('should return false as the user is not logged', () => {

    service.isLogged = false;
    const isLoggedAsObservable: Observable<boolean> = service.$isLogged();
    expect(isLoggedAsObservable).toBeFalsy;
    
  });

});
