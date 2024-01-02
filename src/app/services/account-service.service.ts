import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { listAccounts } from '../constants/account-value-model';
import { environment } from '../../environments/environment';
import { getAccountDetail } from '../constants/graphql-query-model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  queryRequest: string = getAccountDetail;

  private apiUrl = environment.apiUrl + '/accounts/create';

  constructor(private http: HttpClient,
              private apollo: Apollo
  ) {

  }

  createAccount(account: Account){
    return this.http.post(this.apiUrl, account);
  }

  getListAccount(page: string, size: string, fields?: string[]): Observable<CommonPageInfo<Account>>{
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
