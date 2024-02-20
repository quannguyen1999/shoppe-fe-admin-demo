import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { AccountServiceService } from './account-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class authServiceGuard  implements CanActivate {

  constructor(
    private accountService: AccountServiceService, 
    private http: HttpClient
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const numberOfRequest = this.accountService.getNumberOfRequest();
    const code = route.queryParams['code'];
    if (code && this.accountService.getToken() == null && numberOfRequest <= 1
    ) { 
      const tokenEndpoint = environment.apiUrl + 'accounts/token';
      const redirectUri = environment.redirectUrl;
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      });
      const body = new HttpParams()
        .set('code', code)
        .set('redirectUrl', redirectUri);
      this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
        next: this.accountService.handlerSaveToken.bind(this),
        error: this.accountService.handlerErrorResponse.bind(this)
      });
    } else if (this.accountService.getToken() == null && numberOfRequest <= 1){
      const authorizationUrl = environment.oauthUrl + 'oauth2/authorize' +
      '?client_id=admin' +
      '&redirect_uri=' + environment.redirectUrl +
      '&scope=read write' +
      '&response_type=code' +
      '&response_mode=form_post';
      this.accountService.setNumberOfRequest(numberOfRequest);
      window.location.href = authorizationUrl;
    } else if(numberOfRequest >= 2) {
      console.log("bug on auth-service")
      return false;
    }
    return true;
  }

}