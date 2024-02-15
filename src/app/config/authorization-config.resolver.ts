import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountServiceService } from '../services/account-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationResolver implements Resolve<boolean> {

  constructor(private accountService: AccountServiceService) {}

  resolve(): Observable<boolean> {
    return of(this.accountService.getToken() != null);
  }
}
