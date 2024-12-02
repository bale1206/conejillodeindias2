import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfilePage } from './profile.page';
import { AuthService } from '../Services/authenticator.service'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProfilePage', () => {
  let component: ProfilePage;
  let fixture: ComponentFixture<ProfilePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfilePage],
      imports: [HttpClientTestingModule], 
      providers: [AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), 
            queryParams: of({ query: 'test' }), 
          },
        },
      ] 
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
