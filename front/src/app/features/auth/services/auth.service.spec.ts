import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";

describe('SessionService', () => {

    let service: AuthService;

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule]
        });

        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register', () => {

        let httpClient = TestBed.inject(HttpClient);
        const httpClientMock = jest.spyOn(httpClient, "post").mockImplementation();

        const mockRegisterRequest = {
            email: "email@email.com",
            firstName: "firstName",
            lastName: "lastName",
            password: "password"
        };

        service.register(mockRegisterRequest);

        expect(httpClientMock).toHaveBeenCalled();

    });

    it('should login', () => {

        let httpClient = TestBed.inject(HttpClient);
        const httpClientMock = jest.spyOn(httpClient, "post").mockImplementation();

        const mockLoginRequest = {
            email: "email@email.com",
            password: "password"
        };

        service.login(mockLoginRequest);

        expect(httpClientMock).toHaveBeenCalled();

    });

});
