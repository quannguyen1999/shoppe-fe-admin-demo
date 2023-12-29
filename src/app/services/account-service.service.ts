import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {
  getAccountDetail: string = `
  query AccountDetail {
    listAccount(
        accountRequestDto: {
            page: $page,
            size: $size,
            fromBirthday: "1999-10-23",
            toBirthday: "2023-12-23"
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
    ) {}

  createAccount(account: Account){
    return this.http.post(this.apiUrl, account);
  }

  getListAccount(page: string, size: string, fields?: string[]): Observable<Account[]>{
    const dynamicFields = fields ? fields.join(",") : "";
    console.log(fields)
    this.getAccountDetail = this.getAccountDetail.replaceAll('$page',page);
    this.getAccountDetail = this.getAccountDetail.replaceAll('$size', size);
    this.getAccountDetail = this.getAccountDetail.replaceAll('$fields', dynamicFields);
    console.log(this.getAccountDetail)
    return this.apollo.query<{listAccount: {data: Account[]}}>({
      query: gql(this.getAccountDetail)
    }).pipe(map((response) => response.data.listAccount.data))
  }

}
