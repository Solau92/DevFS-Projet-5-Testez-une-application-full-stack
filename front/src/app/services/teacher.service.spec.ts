import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { expect } from '@jest/globals';

import { TeacherService } from './teacher.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Teacher } from '../interfaces/teacher.interface';

describe('TeacherService', () => {

  let service: TeacherService;
  let httpClient: HttpClient;

  const teacher1: Teacher = {
    id: 1,
    lastName: "lastName1",
    firstName: "firstName1",
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const teacher2: Teacher = {
    id: 2,
    lastName: "lastName2",
    firstName: "firstName2",
    createdAt: new Date(),
    updatedAt: new Date()
  }

  const teachers: Array<Teacher> = new Array<Teacher>();
  teachers.push(teacher1);
  teachers.push(teacher2);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(TeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all teachers', () => {

    // TODO : vérifier que OK 
    // Créer un Teacher[], puis un Observable<Teacher[]>
    const teachersAsObservable: Observable<Teacher[]> = new BehaviorSubject<Teacher[]>(teachers);

    // dire que this.httpClient.get<Teacher[]>(`nptquelchemin`) doit renvoyer monObservable<Teacher[]>
    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "get").mockImplementation(() => teachersAsObservable);

    // tester qu'on obtient bien mon Teacher[] quand on exécute service.all()
    expect(service.all()).toBe(teachersAsObservable);

  });

  it('should return details of a teacher given its id', () => {

    // TODO : vérifier que OK
    // Créer un Teacher, puis un Observable<Teacher>
    const teacher1AsObservable: Observable<Teacher> = new BehaviorSubject<Teacher>(teacher1);

    // dire que this.httpClient.get<Teacher>(`nptquelchemin`) doit renvoyer monObservable<Teacher>
    httpClient = TestBed.inject(HttpClient);
    const httpClientMock = jest.spyOn(httpClient, "get").mockImplementation(() => teacher1AsObservable);

    // tester qu'on obtient bien monTeacher quand on exécute service.detail()
    expect(service.detail("2")).toBe(teacher1AsObservable);

  });

});
