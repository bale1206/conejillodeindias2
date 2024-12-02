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
      licensePlate: ['', Validators.pattern(/^[A-Z0-9-]+$/)] 
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const { name, email, password, licensePlate } = this.registroForm.value;

      const userData: { name: string; email: string; password: string; licensePlate?: string } = { name, email, password };
      
      if (licensePlate) {
        userData.licensePlate = licensePlate;
      }

      this.authService.registrarUsuario(userData).subscribe({
        next: (response) => {
          console.log('Usuario registrado:', response);
          alert('Usuario registrado con éxito. Ahora puedes iniciar sesión.');

          this.router.navigate(['/login']);  
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
