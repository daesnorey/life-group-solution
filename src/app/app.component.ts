import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Location } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnDestroy {

  public mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(
    public location: Location,
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    public loadingService: LoadingService,
    public authService: AuthService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 705px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}
