import { Component } from '@angular/core';
import { AuthService } from '../Services/authenticator.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
})
export class RecuperarPage {
  email: string = ''; 

  constructor(private authService: AuthService) {}

  
  async recuperarContrasena() {
    try {
      const mensaje = await this.authService.recuperarContrasena(this.email);
      alert(mensaje); 
    } catch (error) {
      alert('Error: ' + error); 
    }
  }
}
