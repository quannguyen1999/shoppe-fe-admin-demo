import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ACCESS_TOKEN } from '../constants/constant-value-model';
import { AccountServiceService } from '../services/account-service.service';

@Injectable({
  providedIn: 'root'
})
export class IntercepterHttpTokenService implements HttpInterceptor {

  constructor(private accountService: AccountServiceService){

  }

  intercept(request: HttpRequest<any>, next: HttpHandler):  Observable<HttpEvent<Object>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ` + localStorage.getItem(ACCESS_TOKEN)
      }
    });
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse  && error.status === 401) {
        return this.handle401Error(request, next);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    this.accountService.getRefreshToken();
    return next.handle(request);
  }


}
