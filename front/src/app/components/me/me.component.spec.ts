import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';

describe('MeComponent', () => {

  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let router: Router;
  let userService: UserService;

  const mockSessionService = {
    logOut: jest.fn(),
    sessionInformation: {
      admin: true,
      id: 1
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeComponent],
      imports: [
        MatSnackBarModule,
        HttpClientModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule
      ],
      providers: [{ provide: SessionService, useValue: mockSessionService }, UserService],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MeComponent);
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

  it('should init', () => {

    userService = TestBed.inject(UserService);
    const userServiceMock = jest.spyOn(userService, "getById").mockImplementation(() => new Observable<User>());

    component.ngOnInit();

    expect(userServiceMock).toHaveBeenCalled();

  });

  it('should delete', () => {

    userService = TestBed.inject(UserService);
    const userServiceMock = jest.spyOn(userService, "delete").mockReturnValue(of(undefined));

    let matSnackBar = TestBed.inject(MatSnackBar);
    const matSnackBarMock = jest.spyOn(matSnackBar, "open").mockImplementation();

    let sessionService = TestBed.inject(SessionService);
    const sessionServiceMock = jest.spyOn(sessionService, "logOut").mockImplementation();

    router = TestBed.inject(Router);
    const routerMock = jest.spyOn(router, "navigate").mockImplementation(async () => true);

    component.delete();

    expect(userServiceMock).toHaveBeenCalledWith('1');
    expect(matSnackBarMock).toHaveBeenCalledWith('Your account has been deleted !', 'Close', { duration: 3000 });
    expect(sessionServiceMock).toHaveBeenCalled();
    expect(routerMock).toHaveBeenCalledWith(['/']);

  });

});
