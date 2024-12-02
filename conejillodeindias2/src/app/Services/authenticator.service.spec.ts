import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './authenticator.service';

describe('AuthenticatorService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AuthService] 
    }).compileComponents();

    service = TestBed.inject(AuthService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); 
  });
});
