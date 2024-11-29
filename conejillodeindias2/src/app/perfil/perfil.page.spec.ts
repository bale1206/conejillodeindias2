import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PerfilPage } from './perfil.page';
import { AuthService } from '../Services/authenticator.service'
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PerfilPage],
      imports: [HttpClientTestingModule], 
      providers: [AuthService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), //nota: el 'of', por lo que entendi, se usa para simular observables que devuelvan datos de prueba
            queryParams: of({ query: 'test' }), 
          },
        },
      ] 
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
