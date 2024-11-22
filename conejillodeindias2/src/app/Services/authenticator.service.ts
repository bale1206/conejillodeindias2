import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: { [key: string]: any } = {}; // Simulación de almacenamiento

  set(key: string, value: any): Promise<any> {
    return new Promise((resolve) => {
      this.storage[key] = value;
      resolve(value);
    });
  }

  get(key: string): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.storage[key] || null);
    });
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticatorService {
  constructor(private storage: StorageService) {}

  async registrar(user: any): Promise<boolean> {
    return this.storage.set(user.username, user).then((res) => {
      return res != null;
    }).catch(() => {
      return false;
    });
  }

  async recuperarContraseña(email: string): Promise<string> {
    try {
      const user = await this.storage.get(email);
      if (user) {
        return 'Correo enviado exitosamente a: ' + email;
      } else {
        throw new Error('No se encontró el usuario con ese correo');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Error al recuperar contraseña: ' + error.message);
      } else {
        throw new Error('Error desconocido al recuperar contraseña');
      }
    }
  }
}