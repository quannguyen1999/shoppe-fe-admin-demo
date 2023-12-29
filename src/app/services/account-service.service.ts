import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountServiceService {

  private apiUrl = 'http://localhost:8080/accounts/create';

  constructor(private http: HttpClient) {}

  createAccount(account: Account){
    return this.http.post(this.apiUrl, account);
  }
}
