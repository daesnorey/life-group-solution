import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ApiMethodEnum } from '../enums/api-method.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private persistentLoginListeners = [];
  private loginListeners = [];
  private logoffListeners = [];

  private cacheUsers: [{username: string, password: string, type: string}];

  /**
   * gets users
   */
  public get usersDictionary():
    [{username: string, password: string, type: string}] | Promise<[{username: string, password: string, type: string}]> {
    if (this.cacheUsers) {
      return this.cacheUsers;
    }

    return new Promise((resolve, onReject) => {
      this.apiService
      .get(ApiMethodEnum.API_METHOD_USERS)
      .subscribe(res => {
        const users = res as [{username: string, password: string, type: string}];
        this.cacheUsers = users;
        resolve(this.cacheUsers);
      }, error => {
        console.log(error);
        onReject(error);
      }, () => {
        console.log('completed');
      });
    });
  }

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

  public get type(): string {
    const type = localStorage.getItem('type');
    if (type) {
      return atob(type);
    }
    return '';
  }

  constructor(private router: Router, private apiService: ApiService) { }

  private getIsLogged(): boolean {
    return this.username && this.username.length > 0;
  }

  /**
   * Attemps to login into account
   * @param username unique username to login with
   * @param password account key phrase
   */
  public login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve, onReject) => {
      this.apiService.get(ApiMethodEnum.API_METHOD_USERS, [
        {key: 'username', value: username}, {key: 'password', value: password}
      ]).subscribe(res => {
        if (res && res instanceof Array && res.length > 0) {
          if (res[0].username === username) {
            localStorage.setItem('username', btoa(username));
            localStorage.setItem('type', btoa(res[0].type));
            this.fireListeners(true);
            resolve(true);
            return;
          }
        }

        resolve(false);
      }, (error) => {
        onReject(error);
      });
    });
  }

  /**
   * Logs off
   */
  public logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('type');
    this.fireListeners(false);
    this.router.navigate(['/login']);
  }

  /**
   * Adds callback listener
   * @param callback login listener
   */
  public onLogout(callback: () => void) {
    this.logoffListeners.push(callback);
  }

  /**
   * Adds callback listener
   * @param callback login listener
   */
  public onLogin(callback: () => void, isPersistent = false) {
    if (isPersistent) {
      this.persistentLoginListeners.push(callback);
    } else {
      this.loginListeners.push(callback);
    }
  }

  /**
   * Fires listeners
   */
  private fireListeners(loginEvent: boolean) {
    const listeners = loginEvent ? this.loginListeners : this.logoffListeners;
    for (const listener of (listeners || [])) {
      listener();
    }

    const persistentListeners = loginEvent ? this.persistentLoginListeners : [];
    for (const listener of (persistentListeners || [])) {
      listener();
    }
  }
}
