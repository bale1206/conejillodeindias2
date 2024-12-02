import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  
import { AuthService } from '../Services/authenticator.service';  

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,  
    private authService: AuthService  
  ) {}

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const { name, email, password } = this.registroForm.value;

      this.authService.registrarUsuario({ name, email, password }).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');

          
          this.router.navigate(['/iniciosesion']);  
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
