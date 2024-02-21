import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { AccountServiceService } from '../services/account-service.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { ToastServiceService } from '../services/toast-service.service';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/constant-value-model';

@Injectable({
  providedIn: 'root'
})
export class IntercepterHttpTokenService implements HttpInterceptor {

  constructor(private accountService: AccountServiceService,
            private router: Router,
            private http: HttpClient,
            private toastrService: ToastServiceService
    ){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<Object>> {
    
    if(this.accountService.getToken() != null){
      // console.log(this.accountService.getToken())
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ` + this.accountService.getToken()
        }
      });
    }
   
    if(this.accountService.getNumberOfRequest() >= 2){
      this.router.navigate(["/error"]);
      return throwError(null);
    }

    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse  && error.status === 401) {
        return this.handle401Error(request, next);
      }
      if (error.url == environment.apiUrl + 'accounts/token' && error instanceof HttpErrorResponse  && error.status === 500) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        this.router.navigate(["/error"]);
        return next.handle(request);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let value = this.accountService.getNumberOfRequest();
    this.accountService.setNumberOfRequest(value);
    if(value >= 2){
      this.router.navigate(["/error"]);
      return throwError(null);
    }
    //get refresh token 
    localStorage.removeItem(ACCESS_TOKEN);
    const tokenEndpoint = environment.apiUrl + 'accounts/refreshToken';
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refreshToken', this.accountService.getRefreshToken() || "");
    this.http.post(tokenEndpoint, body.toString(), { headers }).subscribe({
      next: this.accountService.handlerSaveToken.bind(this),
      error: this.accountService.handlerErrorResponse.bind(this)
    });
    return next.handle(request);
  }


}
