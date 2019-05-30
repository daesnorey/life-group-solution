import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ControlAccountsService } from '../services/control-accounts.service';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateCol101InsuredGuard implements CanActivate  {

  private constructor(
    private controlAccountsService: ControlAccountsService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return new Promise<boolean>((resolve, onReject) => {
        this.loadingService.isLoading = true;
        this.controlAccountsService
        .getInsuredForCol101(route.params)
        .then((res) => {
          if (res) {
            resolve(res);
            return;
          } else {
            this.router.navigate(['/']);
            resolve(false);
          }
        })
        .catch((reason) => {
          console.log(reason);
          this.router.navigate(['/']);
          onReject(false);
        });
      });
  }

}
