import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: { [key: string]: any } = {}; 

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