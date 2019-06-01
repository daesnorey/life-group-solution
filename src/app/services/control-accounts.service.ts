import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { ApiMethodEnum } from '../enums/api-method.enum';
import { Params } from '@angular/router';

export interface Insured {
  id: string;
  docType: string;
  gender: string;
  docNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  col101Responded: boolean;
}

export interface Account {
    id: string;
    middleman: string;
    taker: string;
    policy: number;
    takerEntityName: string;
    takerDocumentNumber: string;
    insured: Insured[];
}

@Injectable({
  providedIn: 'root'
})
export class ControlAccountsService {

  private cacheAccounts: Account[] | Account;
  private accountForCol101: Account;

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  public getAccount(): Account[] | Promise<Account[]> | Account | Promise<Account> {
    if (this.cacheAccounts) {
      return this.cacheAccounts;
    }

    if (this.authService.type === 'intermediario') {
      return this.getMiddlemanAccounts();
    } else if (this.authService.type === 'tomador') {
      return this.getTakerAccount();
    }

    return null;
  }

  public getMiddlemanAccounts(): Promise<Account[]> {
    return new Promise((resolve, onReject) => {
      this.apiService
      .get(ApiMethodEnum.API_METHOD_ACCOUNTS, [
        {key: 'middleman', value: this.authService.username}
      ])
      .subscribe(res => {
        const accounts = res as Account[];
        this.cacheAccounts = accounts;
        this.authService.onLogout(this.clearCacheAccounts.bind(this));
        resolve(this.cacheAccounts);
      }, error => {
        console.log(error);
        onReject(error);
      }, () => {
        console.log('completed');
      });
    });
  }

  private getTakerAccount(): Account | Promise<Account> {
    return new Promise((resolve, onReject) => {
      this.apiService
      .get(ApiMethodEnum.API_METHOD_ACCOUNTS, [
        {key: 'taker', value: this.authService.username}
      ])
      .subscribe(res => {
        const accounts = res as Account[];
        if (accounts && accounts.length > 0) {
          this.cacheAccounts = accounts[0];
          this.authService.onLogout(this.clearCacheAccounts.bind(this));
          resolve(this.cacheAccounts);
        }
        resolve(null);
      }, error => {
        console.log(error);
        onReject(error);
      }, () => {
        console.log('completed');
      });
    });
  }

  /**
   * Gets account for col 101
   */
  public getAccountForCol101() {
    return this.accountForCol101;
  }

  public resetAccountForCol101() {
    this.accountForCol101 = null;
  }

  /**
   * Gets insured for col101
   */
  public getInsuredForCol101(params: Params): Promise<boolean> {
    return new Promise<boolean>((resolve, onReject) => {
      this.apiService
      .get(ApiMethodEnum.API_METHOD_ACCOUNTS, [
        {key: 'policy', value: params.policy}
      ])
      .subscribe(res => {
        const accounts = res as Account[];
        if (accounts && accounts.length > 0) {
          const account = accounts[0];
          const insured = account.insured.find((current) => current.id === `${params.insured_id}`);
          if (insured) {
            account.insured = [insured];
            this.accountForCol101 = account;
            resolve(true);
          } else {
            resolve(false);
          }
        }
      }, (error) => {
        console.log(error);
        onReject(error);
      });
    });
  }

  private clearCacheAccounts() {
    this.cacheAccounts = null;
  }
}
