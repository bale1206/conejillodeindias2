import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  
  constructor(private http: HttpClient) {}

  registrarUsuario(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error('Error al registrar usuario'));
      })
    );
  }

  recuperarContrasena(email: string): Observable<any> {
    throw new Error('Método no implementado.');
  }
  validarCredenciales(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      catchError((error) => {
        console.error('Error al validar credenciales:', error);
        return throwError(() => new Error('Credenciales incorrectas.'));
      }),
      map((users) => {
        console.log('Usuarios encontrados:', users); 
        if (users && users.length === 1) {
          return users[0];  
        } else {
          throw new Error('Credenciales incorrectas');
        }
      })
    );
  }
  
  
}