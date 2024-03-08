import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { UserService } from './user.service';
import { User } from '../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';

describe('UserService', () => {

  let service: UserService;
  let httpClient: HttpClient;

  const user1: User = {
    id: 1,
    email: 'user1@email.com',
    lastName: 'lastName1',
    firstName: 'firstName1',
    admin: false,
    password: 'password',
    createdAt: new Date()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user given its id', () => {

    // TODO : vérifier que OK
    // Créer un Observable<User]>
    const user1AsObservable: Observable<User> = new BehaviorSubject<User>(user1);

    // dire que this.httpClient.get<User>(`nptquelchemin`) doit renvoyer user1AsObservable
    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "get").mockImplementation(() => user1AsObservable);

    // tester qu'on obtient bien user1AsObservable quand on exécute service.getById
    expect(service.getById("1")).toBe(user1AsObservable);

  });

  it('should delete a user given its id', () => {

    // TODO : vérifier que OK

    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "delete");

    let id: string = "1";

    service.delete(id);

    expect(httpClientMock).toHaveBeenCalledWith("api/user/" + id);

  });


});
