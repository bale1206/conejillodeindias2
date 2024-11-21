import { Injectable } from '@angular/core';
import { StorageService } from '../Services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  constructor(private storage: StorageService) { }

  async registrar(user: any):Promise<boolean> {
    //set(llave,valor)
    return this.storage.set(user.username, user).then((res) => {
        if (res != null) {
          return true;
        }else{
          return false;
        }
      })
      .catch((error) => {
        return false;
      });
  }
}
