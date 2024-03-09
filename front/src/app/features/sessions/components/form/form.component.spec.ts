import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { expect } from '@jest/globals';
import { SessionService } from 'src/app/services/session.service';
import { SessionApiService } from '../../services/session-api.service';

import { FormComponent } from './form.component';
import { Session } from '../../interfaces/session.interface';
import { Observable } from 'rxjs';

describe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let sessionApiService: SessionApiService;

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

  // TODO : voir si on teste constructeur et ngOnInit ? 

  it('should init component, user is not admin', () => {

    // TODO : voir comment tester !this.sessionService.sessionInformation!.admin
    // car attribut privé...
  
  });

  it('should init component, user is admin', () => {

    // TODO : voir comment on teste (cf ci-dessus le 1er if)
    // + le 2ème if(router est privé aussi)

    // sessionApiService = TestBed.inject(SessionApiService);
    // const sessionApiServiceMock = jest.spyOn(sessionApiService, "detail").mockImplementation(() => new Observable<Session>());

    // component.ngOnInit();

    // expect(sessionApiServiceMock).toHaveBeenCalled();
  });


  it('should submit session form for creating a session', () => {

    // TODO : voir si OK + compléter pour tester le .subscribe
    component.onUpdate = false;

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "create").mockImplementation(() => new Observable<Session>());

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

  it('should submit session form for updating a session', () => {

    // TODO : voir si OK + compléter pour tester le .subscribe
    component.onUpdate = true;

    sessionApiService = TestBed.inject(SessionApiService);
    const sessionApiServiceMock = jest.spyOn(sessionApiService, "update").mockImplementation(() => new Observable<Session>());

    component.submit();

    expect(sessionApiServiceMock).toHaveBeenCalled();

  });

  // it('should init session form', () => {


  // });

  // TODO : voir comment tester parties private ??

});
