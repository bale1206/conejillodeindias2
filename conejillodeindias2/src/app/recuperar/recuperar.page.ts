import { Component } from '@angular/core';
import { AuthenticatorService } from '../Services/authenticator.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
})
export class RecuperarPage {
  email: string = ''; // Campo para almacenar el correo ingresado por el usuario

  constructor(private authService: AuthenticatorService) {}

  async recuperarContrasena() {
    try {
      // Llama al método del servicio para recuperar la contraseña
      const mensaje = await this.authService.recuperarContraseña(this.email);
      alert(mensaje); // Muestra mensaje de éxito
    } catch (error) {
      alert('Error: ' + error); // Muestra error si ocurre
    }
  }
}
