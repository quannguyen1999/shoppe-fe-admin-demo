import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, AccountRequestModel } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, catchError, map, throwError } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { getAccountDetail } from '../constants/graphql-query-model';
import { ACCOUNT_CREATE, ACCOUNT_EXPORT, ACCOUNT_PUT } from '../constants/api-value';
import { environment } from '../../environments/environment';
import { ACCESS_TOKEN, NUMBER_TRY_REQUEST, REFRESH_TOKEN } from '../constants/constant-value-model';
import { Router } from '@angular/router';
import { callback } from 'chart.js/dist/helpers/helpers.core';
import { local } from 'd3-selection';
import { LocalStorageCustomService } from './local-storage-custom.service';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  queryRequest: string = getAccountDetail;

  constructor(private http: HttpClient,
              private apollo: Apollo,
              private router: Router,
              private localStorageCustom: LocalStorageCustomService
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

  getNumberOfRequest(){
    
    const currentValue = Number.parseInt((this.localStorageCustom.getWithExpiry(NUMBER_TRY_REQUEST) || '0'));
   
    return currentValue;
  }

  setNumberOfRequest(currentValue: number){
    this.localStorageCustom.setWithExpiry(NUMBER_TRY_REQUEST, (currentValue + 1).toString(), 5000);
  }

  getToken(){
   
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(){
    return localStorage.getItem(REFRESH_TOKEN);
  }

  requestLoginPage(){
    const authorizationUrl = environment.oauthUrl + 'oauth2/authorize' +
      '?client_id=admin' +
      '&redirect_uri=' + environment.redirectUrl +
      '&scope=read write' +~
      '&response_type=code' +
      '&response_mode=form_post';
    this.setNumberOfRequest(this.getNumberOfRequest());
    window.location.href = authorizationUrl;
  }

  handlerSaveToken(response: any){
    localStorage.setItem(ACCESS_TOKEN, response.access_token)
    localStorage.setItem(REFRESH_TOKEN, response.refresh_token)
  }

  handlerErrorResponse(){
    let value = localStorage.getItem(NUMBER_TRY_REQUEST) || 0;
    localStorage.setItem(NUMBER_TRY_REQUEST, (Number.parseInt(value.toString()) + 1).toString());
  }

  createAccount(account: Account){
    return this.http.post(ACCOUNT_CREATE, account);
  }

  updateAccount(account: Account){
    return this.http.put(ACCOUNT_PUT, account);
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
      // ,
      // catchError((error) => {
      //     // Handle errors here
      //     console.error('Error occurred:', error);
      //     return throwError('An error occurred. Please try again later.');
      // })
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
