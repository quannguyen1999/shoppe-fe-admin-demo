import { Component } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';


export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8070',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://127.0.0.1:4200/',

  tokenEndpoint: 'http://localhost:8070/oauth2/token',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'admin',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'read write',


  showDebugInformation: true,
  
  requestAccessToken: true
};


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  imageLoginPage: string = 'assets/images/loginPage.png';

  rememberMe: string[] = [];

  constructor(private oauthService: OAuthService){
    this.oauthService.initCodeFlow();
    this.oauthService.initLoginFlow();
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.setStorage(sessionStorage)
console.log(this.oauthService.getAccessToken)
    console.log(this.oauthService.getRefreshToken)
    console.log(this.oauthService.getAccessToken())
    console.log(this.oauthService.getRefreshToken())
  }

  submitLogin(){
    this.oauthService.loadDiscoveryDocumentAndTryLogin().then(()=>{
       alert(this.oauthService.hasValidAccessToken)
     });
  }

}
