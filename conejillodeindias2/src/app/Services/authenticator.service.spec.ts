import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './authenticator.service';

describe('AuthenticatorService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provides a mock HttpClient
      providers: [AuthService] // Register the service being tested
    }).compileComponents();

    service = TestBed.inject(AuthService); // Inject the service
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Ensure the service instance is created
  });
});
