import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { ApiMethodEnum } from '../enums/api-method.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private cacheMenus: {name: string, icon: string, path: string, for: string[]}[];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  public get menus(): {name: string, icon: string, path: string, for: string[]}[] |
    Promise<{name: string, icon: string, path: string, for: string[]}[]> {
      if (this.cacheMenus) {
        return this.cacheMenus;
      }

      return new Promise((resolve, onReject) => {
        this.apiService
        .get(ApiMethodEnum.API_METHOD_MENUS, [
          {key: 'for_like', value: this.authService.type}
        ])
        .subscribe(res => {
          const menus = res as [{name: string, icon: string, path: string, for: string[]}];
          this.cacheMenus = menus;
          this.authService.onLogout(this.clearCacheMenu.bind(this));
          resolve(this.cacheMenus);
        }, error => {
          console.log(error);
          onReject(error);
        }, () => {
          console.log('completed');
        });
      });
  }

  private clearCacheMenu() {
    this.cacheMenus = null;
  }
}
