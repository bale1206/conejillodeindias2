import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Services/authenticator.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService // Inyecta AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password } = this.registerForm.value;
  
      this.authService.registrarUsuario({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario guardado:', response);
          alert('Usuario registrado con éxito.');
          this.router.navigate(['/login']); 
        },
        error: (err) => {
          console.error('Error al guardar el usuario:', err);
          alert('Hubo un problema al registrar al usuario.');
        },
      });
    } else {
      console.log('Formulario no válido');
      alert('Por favor, complete todos los campos correctamente.');
    }
  }
}