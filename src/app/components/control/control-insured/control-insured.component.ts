import { Component, OnInit } from '@angular/core';
import { Account, ControlAccountsService, Insured } from 'src/app/services/control-accounts.service';
import { MatTableDataSource, MatTab } from '@angular/material';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-control-insured',
  templateUrl: './control-insured.component.html',
  styleUrls: ['./control-insured.component.less']
})
export class ControlInsuredComponent implements OnInit {

  public displayedColumns: string[] = ['name', 'firstLastName', 'secondLastName', 'link', 'col101Responded'];
  public dataSource: MatTableDataSource<Insured>;
  public policy: number;

  public set account(account: Account) {
    this.policy = account.policy;
    this.dataSource = new MatTableDataSource(account.insured);
  }

  constructor(
    private controlAccountsService: ControlAccountsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.getAccount();
  }

  private getAccount() {
    const tmpAccount = this.controlAccountsService.getAccount();
    if (tmpAccount instanceof Promise) {
      (tmpAccount as Promise<Account>)
        .then(account => {
          if (account !== null) {
            this.account = account;
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      this.account = tmpAccount as Account;
      setTimeout(() => {
        this.loadingService.isLoading = false;
      }, 500);
    }
  }

  /**
   * Filters data in table
   * @param filter key words to look for
   */
  public applyFilter(filter: string) {
    this.dataSource.filter = filter.trim().toLowerCase();
  }
}
