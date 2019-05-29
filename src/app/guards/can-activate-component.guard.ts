import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateComponentGuard implements CanActivate  {

  public constructor(
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
      if (this.authService.isLogged) {
        this.loadingService.isLoading = true;
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
  }
}
