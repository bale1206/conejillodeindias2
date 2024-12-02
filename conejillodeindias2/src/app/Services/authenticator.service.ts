import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError,map } from 'rxjs';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  registrarUsuario(user: any): Observable<any> {
    const url = user.licensePlate ? '/choferes' : '/pasajero';  

    return this.http.post(`${this.apiUrl}${url}`, user).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error('Error al registrar usuario'));
      })
    );
  }

  recuperarContrasena(email: string): Observable<any> {
    throw new Error('Método no implementado.');
  }

  validarCredenciales(email: string, password: string, tipo: 'chofer' | 'pasajero'): Observable<any> {
    const url = `${this.apiUrl}/${tipo}?email=${email}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error(`Error al validar credenciales para ${tipo}:`, error);
        return throwError(() => new Error('Credenciales incorrectas.'));
      }),
      map((users) => {
        console.log(`${tipo} encontrados:`, users);
        if (users && users.length === 1) {
          return users[0];  
        } else {
          throw new Error('Credenciales incorrectas.');
        }
      })
    );
  }
  
  
  
  
}
