import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { CommonPageInfo } from '../models/common-page.model';
import { listAccounts } from '../constants/account-value-model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  getAccountDetail: string = `
  query AccountDetail($page: Int!, $size: Int!) {
    listAccount(
        accountRequestDto: {
            page: $page,
            size: $size,
            username: null,
            gender: null
        }
    ) {
      page,
      size,
      total,
      data{
        $fields
      }
    }
  }
  `;

  replacements: Record<string, string> = {
    $test: 'replacementTest',
    $value: 'replacementValue'
  };

  private apiUrl = 'http://localhost:8080/accounts/create';

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
    this.getAccountDetail = this.getAccountDetail.replaceAll('$fields', dynamicFields);
    
    return this.apollo
    .query<{ listAccount: CommonPageInfo<Account> }>({
      query: gql`${this.getAccountDetail}`, // Using gql tag for template literals
      variables: { page, size },
    })
    .pipe(
      map((response) => response.data.listAccount)
    );
  
  }

}
