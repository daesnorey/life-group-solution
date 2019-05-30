import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit, OnDestroy {

  public menus: {name: string, icon: string, path: string, for: string[]}[];
  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    public location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public loadingService: LoadingService,
    public authService: AuthService,
    private menuService: MenuService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 705px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit(): void {
    if (this.authService.isLogged) {
      this.getMenu();
    }

    this.authService.onLogin(() => {
      this.getMenu();
    }, true);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  /**
   * Gets menu
   */
  private getMenu() {
    const tmpMenus = this.menuService.menus;
    if (tmpMenus instanceof Promise) {
      tmpMenus
        .then(menus => {
          this.menus = menus;
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      this.menus = tmpMenus;
    }

    this.authService.onLogout(() => {
      this.menus = null;
    });
  }
}
