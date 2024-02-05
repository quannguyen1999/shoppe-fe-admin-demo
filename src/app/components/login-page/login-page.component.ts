import { Component } from '@angular/core';
import { AccountServiceService } from '../../services/account-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  imageLoginPage: string = 'assets/images/loginPage.png';

  rememberMe: string[] = [];

  constructor(private accountService: AccountServiceService){
    this.accountService.redirectToAuthorization()
  }
  
}
