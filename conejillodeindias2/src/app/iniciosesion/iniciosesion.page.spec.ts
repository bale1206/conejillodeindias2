import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IniciosesionPage } from './iniciosesion.page';
import { AuthService } from '../Services/authenticator.service'

describe('IniciosesionPage', () => {
  let component: IniciosesionPage;
  let fixture: ComponentFixture<IniciosesionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IniciosesionPage],
      imports: [HttpClientTestingModule], 
      providers: [AuthService] 
    }).compileComponents();

    fixture = TestBed.createComponent(IniciosesionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
