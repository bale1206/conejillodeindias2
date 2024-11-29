import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationPage } from './location.page';
import { AuthService } from '../Services/authenticator.service'

describe('LocationPage', () => {
  let component: LocationPage;
  let fixture: ComponentFixture<LocationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationPage],
      imports: [HttpClientTestingModule], 
      providers: [AuthService] 
    }).compileComponents();

    fixture = TestBed.createComponent(LocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
