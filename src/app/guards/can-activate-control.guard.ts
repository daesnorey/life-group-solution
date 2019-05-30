import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateControlGuard implements CanActivate {

  private constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      if (this.authService.type === 'tomador') {
        if (route.url.findIndex((segment) => segment.path === 'insured') >= 0) {
          return true;
        }
      } else if (this.authService.type === 'intermediario') {
        if (route.url.findIndex((segment) => segment.path === 'accounts') >= 0) {
          return true;
        }
      }

      this.router.navigate(['/']);
      return false;
  }
}
