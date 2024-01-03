import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { listAccounts } from '../constants/account-value';
import { environment } from '../../environments/environment';
import { getAccountDetail } from '../constants/graphql-query-model';
import { ACCOUNT_CREATE } from '../constants/api-value';

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

  getListAccount(page: number, size: number, fields?: string[]): Observable<CommonPageInfo<Account>>{
    const filterField = fields?.filter(field => field !== 'function');
    const dynamicFields = filterField ? filterField.join(",") : "";
    this.queryRequest = this.queryRequest.replaceAll('$fields', dynamicFields);
    return this.apollo
    .query<{ listAccount: CommonPageInfo<Account> }>({
      query: gql`${this.queryRequest}`, 
      variables: { page, size },
    })
    .pipe(
      map((response) => response.data.listAccount)
    );
  }

}
