import { Injectable } from '@angular/core';
import { reject } from 'q';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public usersDictionary = [
    {
      username: 'admin',
      password: 'Admin123'
    },
    {
      username: 'usuario1',
      password: 'Usuario123'
    }
  ];

  public get isLogged(): boolean {
    return this.getIsLogged();
  }

  public get username(): string {
    const username = localStorage.getItem('username');
    if (username) {
      return atob(username);
    }
    return '';
  }

  constructor(private router: Router) { }

  private getIsLogged(): boolean {
    return this.username && this.username.length > 0;
  }

  /**
   * Attemps to login into account
   * @param username unique username to login with
   * @param password account key phrase
   */
  public login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, _) => {
      const userFinded = this.usersDictionary.find(
        item => item.username === username.trim().toLocaleLowerCase() && item.password === password.trim()
      );

      const isDefined = userFinded !== undefined;

      setTimeout(() => {
        if (isDefined) {
          localStorage.setItem('username', btoa(username));
        }
        resolve(isDefined);
      }, 1500);
    });
  }

  /**
   * Logs off
   */
  public logout() {
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
