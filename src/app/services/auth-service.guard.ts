import { CanActivateFn } from '@angular/router';
import { ACCESS_TOKEN } from '../constants/constant-value-model';
import { environment } from '../../environments/environment';

export const authServiceGuard: CanActivateFn = (route, state) => {
  console.log("amazing")
  if(localStorage.getItem(ACCESS_TOKEN) == null){
    const authorizationUrl = environment.oauthUrl + 'oauth2/authorize' +
    '?client_id=admin' +
    '&redirect_uri=' + environment.redirectUrl +
    '&scope=read write' +
    '&response_type=code' +
    '&response_mode=form_post';
    window.location.href = authorizationUrl;
  }
  return true;
};
