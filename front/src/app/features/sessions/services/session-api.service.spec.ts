import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { SessionApiService } from './session-api.service';
import { Session } from '../interfaces/session.interface';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

describe('SessionsService', () => {

  let service: SessionApiService;
  let httpClient: HttpClient;

  const pathService: string = 'api/session';

  // TODO : voir si on met ici ou dans un setUp (mais marche pas dans le beforeEach) ?
  const session1: Session = {
    id: 1,
    name: 'session1',
    description: 'session 1',
    date: new Date(),
    teacher_id: 1,
    users: [1, 2]
  }

  const session2: Session = {
    id: 2,
    name: 'session2',
    description: 'session 2',
    date: new Date(),
    teacher_id: 1,
    users: [3, 4]
  }

  const sessions: Array<Session> = [session1, session2];

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });

    service = TestBed.inject(SessionApiService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all sessions', () => {

    // TODO : vérifier que OK 
    const sessionsAsObservable: Observable<Session[]> = new BehaviorSubject<Session[]>(sessions);

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "get").mockImplementation(() => sessionsAsObservable);

    expect(service.all()).toBe(sessionsAsObservable);

  });

  it('should return a session given its id', () => {

    // TODO : vérifier que OK 
    const session1AsObservable: Observable<Session> = new BehaviorSubject<Session>(session1);

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "get").mockImplementation(() => session1AsObservable);

    expect(service.detail("1")).toBe(session1AsObservable);

  });

  it('should delete a session given its id', () => {

    // TODO : vérifier que OK 
    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "delete");

    let id: string = "1";

    service.delete(id);

    expect(httpClientMock).toHaveBeenCalledWith(pathService + "/" + id);

  });

  it('should create the given session', () => {

    // TODO : vérifier que OK 
    const session2AsObservable: Observable<Session> = new BehaviorSubject<Session>(session2);

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "post").mockImplementation(() => session2AsObservable);

    expect(service.create(session2)).toBe(session2AsObservable);
    expect(httpClientMock).toHaveBeenCalledWith(pathService, session2);

  });

  it('should update the given session', () => {

    // TODO : vérifier que OK 
    const session2AsObservable: Observable<Session> = new BehaviorSubject<Session>(session2);

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "put").mockImplementation(() => session2AsObservable);

    const id: string = "2";

    expect(service.update(id, session2)).toBe(session2AsObservable);
    expect(httpClientMock).toHaveBeenCalledWith(pathService + "/" + id, session2);

  });

  it('should add participation of a user', () => {

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "post");

    const sessionId: string = "1";
    const userId: string = "3";

    service.participate(sessionId, userId)

    expect(httpClientMock).toHaveBeenCalledWith(pathService + "/" + sessionId + "/participate/" + userId, null);

  });

  it('should remove participation of a user', () => {

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "delete");

    const sessionId: string = "1";
    const userId: string = "3";

    service.unParticipate(sessionId, userId)

    expect(httpClientMock).toHaveBeenCalledWith(pathService + "/" + sessionId + "/participate/" + userId);

  });

});
