import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ApiMethodEnum } from '../enums/api-method.enum';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private httpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) { }

  public get(path: ApiMethodEnum, params: void | {key: string, value: string}[]): Observable<object> {
    let httpParams = new HttpParams();

    if (params) {
      for (const param of params) {
        httpParams = httpParams.append(param.key, param.value);
      }
    }

    const apiUrl = `${ApiMethodEnum.API_CLIENT}${path}`;

    return this.http
      .get(apiUrl, {
        headers: this.httpHeaders,
        params: httpParams,
      })
      .pipe(
        tap(_ => this.loadingService.isLoading = false)
      );
  }
}
