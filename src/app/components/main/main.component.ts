import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  public menus: {name: string, icon: string, path: string, for: string[]}[];

  constructor(
    private loadingSerive: LoadingService,
    private authService: AuthService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingSerive.isLoading = false;
    }, 500);
    if (this.authService.isLogged) {
      this.getMenu();
    } else {
      this.authService.onLogin(() => {
        this.getMenu();
      });
    }
  }

  /**
   * Gets menu
   */
  private getMenu() {
    const tmpMenus = this.menuService.menus;
    if (tmpMenus instanceof Promise) {
      tmpMenus
        .then(menus => {
          this.setMenu(menus);
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      this.setMenu(tmpMenus);
    }
  }

  private setMenu(menus: {name: string; icon: string; path: string; for: string[]}[]) {
    this.menus = menus.filter((menu) => menu.path.replace('/', '').trim().length);
  }

}
