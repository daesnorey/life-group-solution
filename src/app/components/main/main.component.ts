import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent implements OnInit {

  constructor(private loadingSerive: LoadingService) { }

  ngOnInit() {
    setTimeout(() => {
      this.loadingSerive.isLoading = false;
    }, 500);
  }

}
