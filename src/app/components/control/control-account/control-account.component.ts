import { Component, OnInit } from '@angular/core';
import { ControlAccountsService, Account } from 'src/app/services/control-accounts.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-control-account',
  templateUrl: './control-account.component.html',
  styleUrls: ['./control-account.component.less']
})
export class ControlAccountComponent implements OnInit {

  public displayedColumns: string[] = ['policy', 'takerDocumentNumber', 'takerEntityName', 'insured'];
  private dataSource: MatTableDataSource<Account>;

  public set accounts(accounts: Account[]) {
    this.dataSource = new MatTableDataSource(accounts);
  }

  constructor(
    private controlAccountsService: ControlAccountsService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.getAccounts();
  }

  private getAccounts() {
    const tmpAccount = this.controlAccountsService.getAccount();
    if (tmpAccount instanceof Promise) {
      const tmpAccounts = (tmpAccount as Promise<any>);
      tmpAccounts
        .then(account => {
          if (account !== null) {
            this.accounts = account;
          }
        })
        .catch((reason) => {
          console.log(reason);
        });
    } else {
      this.accounts = ((tmpAccount as any) as  Account[]);
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
