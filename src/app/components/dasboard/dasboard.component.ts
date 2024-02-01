import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { AccountServiceService } from '../../services/account-service.service';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {
  @Input() maxWidth!: string;
  
  chartHeight: string = 'width:100%; height:90%; margin:auto;';

  constructor(private oauthService: OAuthService,private route: ActivatedRoute, private accountService: AccountServiceService){
    // this.route.queryParams.subscribe(params => {
    //   const code = params['code'];
      
    //   if (code) {
    //     // Do something with the code, e.g., send it to your backend for token exchange
    //     console.log('Authorization Code:', code);
    //     accountService.getToken(code);
    //   }
    // });

    console.log(this.oauthService.getAccessToken())

    
  }
}
