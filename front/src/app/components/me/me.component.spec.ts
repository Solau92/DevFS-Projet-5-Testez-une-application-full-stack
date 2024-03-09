import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SessionService } from 'src/app/services/session.service';

import { MeComponent } from './me.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

describe('MeComponent', () => {

  let component: MeComponent;
  let fixture: ComponentFixture<MeComponent>;
  let router: Router;
  let userService: UserService;

  const mockSessionService = {
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
        // TODO : voir problème
    expect(component).toBeTruthy();
  });

  it('should init', () => {

        // TODO 

  });


  it('should go back', () => {

    // TODO 

    // component.back();

    // expect(window.history.back()).toHaveBeenCalled();

  });

  it('should delete', () => {

        // TODO 

    // userService = TestBed.inject(UserService);
    // const userServiceMock = jest.spyOn(userService, "delete").mockImplementation();
    // router = TestBed.inject(Router);
    // const routerMock = jest.spyOn(router, "navigate").mockImplementation(async ()=> true);

    // component.delete();

    // expect(userServiceMock).toHaveBeenCalled();
    // expect(mockSessionService).toHaveBeenCalled()
    // expect(routerMock).toHaveBeenCalledWith(['/']);

  });


});
