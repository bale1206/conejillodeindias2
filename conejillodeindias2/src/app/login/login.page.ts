import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {
      const { email, password } = this.loginForm.value; // Obtén los valores
      console.log('Correo:', email, 'Contraseña:', password); // Aquí agrega la lógica del login
    } else {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
    }
  }
}
