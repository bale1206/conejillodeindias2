import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/authenticator.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService 
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.validarCredenciales(email, password).subscribe({
        next: (response) => {
          if (response && response.length > 0) {
            const usuario = response[0];
            console.log('Usuario autenticado:', usuario);
            this.router.navigate(['/profile'], { queryParams: { username: usuario.name } });
          } else {
            this.errorMessage = 'Correo o contraseña incorrectos.';
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.errorMessage = 'Ocurrió un error al iniciar sesión.';
        },
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
