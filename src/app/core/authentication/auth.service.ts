import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuthenticated = false;

  constructor() {}

  login(username: string, password: string): boolean {
    // Lógica simple de autenticación (puedes conectarlo a una API más adelante)
    if (username === 'user' && password === 'password') {
      this.isAuthenticated = true;
      // Guardar token en localStorage o sessionStorage si es necesario
      return true;
    }
    return false;
  }

  logout(): void {
    this.isAuthenticated = false;
    // Eliminar token del almacenamiento si es necesario
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }
}
