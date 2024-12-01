import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Importamos Router para redirigir
import { AuthService } from '../Services/authenticator.service';  // Importamos el servicio de autenticación

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,  // Inyectamos Router
    private authService: AuthService  // Inyectamos AuthService para el registro
  ) {}

  ngOnInit() {
    // Inicialización del formulario con validaciones
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const { name, email, password } = this.registroForm.value;
      
      // Llamada al servicio para registrar el usuario
      this.authService.registrarUsuario({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');

          // Redirigir al usuario a la página de inicio de sesión después del registro
          this.router.navigate(['/iniciosesion']);  // Asegúrate de que la ruta '/login' sea la correcta
        },
        error: (err) => {
          console.error('Error al registrar al usuario:', err);
          alert('Hubo un problema al registrar al usuario. Intenta nuevamente.');
        },
      });
    } else {
      console.log('Formulario no válido');
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}
