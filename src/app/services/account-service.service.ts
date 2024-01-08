import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account, AccountRequestModel } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { environment } from '../../environments/environment';
import { getAccountDetail } from '../constants/graphql-query-model';
import { ACCOUNT_CREATE, ACCOUNT_EXPORT } from '../constants/api-value';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  queryRequest: string = getAccountDetail;

  constructor(private http: HttpClient,
              private apollo: Apollo
  ) {
  }

  createAccount(account: Account){
    return this.http.post(ACCOUNT_CREATE, account);
  }

  getListAccount(page: number, 
                size: number, 
                fields?: string[], 
                accountRequestModel?: AccountRequestModel
  ): Observable<CommonPageInfo<Account>>{
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post(ACCOUNT_EXPORT, { accountRequestModel }, { headers, responseType: 'blob' });
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
