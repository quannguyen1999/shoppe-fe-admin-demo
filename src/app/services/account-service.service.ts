import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, AccountRequestModel } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { getAccountDetail } from '../constants/graphql-query-model';
import { ACCOUNT_CREATE, ACCOUNT_EXPORT } from '../constants/api-value';
import { environment } from '../../environments/environment';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant-value-model';
import { Router } from '@angular/router';
import { callback } from 'chart.js/dist/helpers/helpers.core';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  queryRequest: string = getAccountDetail;

  constructor(private http: HttpClient,
              private apollo: Apollo,
              private router: Router
  ) {
  }

  redirectToAuthorization(){
    const authorizationUrl = environment.oauthUrl + 'oauth2/authorize' +
    '?client_id=admin' +
    '&redirect_uri=' + environment.redirectUrl +
    '&scope=read write' +
    '&response_type=code' +
    '&response_mode=form_post';
    window.location.href = authorizationUrl;
  }

  getToken(code: string){
    const tokenEndpoint = environment.apiUrl + 'accounts/token';
    const redirectUri = environment.redirectUrl;
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('code', code)
      .set('redirectUrl', redirectUri);
    this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
      next: this.handlerSaveToken.bind(this),
      error: this.handlerErrorResponse.bind(this)
    });
  }

  handlerSaveToken(response: any){
    console.log('response:', response);
    localStorage.setItem(ACCESS_TOKEN, response.access_token)
    localStorage.setItem(REFRESH_TOKEN, response.refresh_token)
  }

  handlerErrorResponse(){
    console.error('Error fetching');
    this.router.navigate(['/']);
  }

  getRefreshtoken(refreshToken: string | null){
    if(refreshToken == null){
      return;
    }
    const tokenEndpoint = environment.apiUrl + 'accounts/refreshToken';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('refreshToken', refreshToken);
    this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
      next: this.handlerSaveToken.bind(this),
      error: this.handlerErrorResponse.bind(this)
    });
  }

  createAccount(account: Account){
    return this.http.post(ACCOUNT_CREATE, account);
  }

  getListAccount(page: number, 
                size: number, 
                fields?: string[], 
                accountRequestModel?: AccountRequestModel
  ): Observable<CommonPageInfo<any>>{
    let query = this.queryRequest;
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    query = query.replaceAll('$fields', dynamicFields);
    return this.apollo
    .query<{ listAccount: CommonPageInfo<Account> }>({
      query: gql`${query}`, 
      variables: { 
        page: page, 
        size: size, 
        id: accountRequestModel?.id,
        username: accountRequestModel?.username,
        fromBirthday: this.formatDateToYYYYMMDD(accountRequestModel?.fromBirthday),
        toBirthday: this.formatDateToYYYYMMDD(accountRequestModel?.toBirthday),
        createFromDate: this.formatDateToYYYYMMDD(accountRequestModel?.createFromDate),
        createToDate: this.formatDateToYYYYMMDD(accountRequestModel?.createToDate),
        isActive: accountRequestModel?.isActive,
        gender: accountRequestModel?.gender,
        email: accountRequestModel?.email,
        listSorted: accountRequestModel?.listSorted
      },
      fetchPolicy: "network-only"
    })
    .pipe(
      map((response) => response.data.listAccount)
    );
  }

  exportExcel(accountRequestModel: AccountRequestModel): Observable<Blob> {
    let filterFields = accountRequestModel.listFields?.filter(field => field !== 'function');
    accountRequestModel.listFields = filterFields;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(ACCOUNT_EXPORT, accountRequestModel, { headers, responseType: 'blob' });
  }

  formatDateToYYYYMMDD(date: Date | null | undefined): string | undefined | null{
    if(date === null){
      return null;
    }

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
  
    return date?.toLocaleDateString('en-US', options).replace(/\//g, '');
  }

}
