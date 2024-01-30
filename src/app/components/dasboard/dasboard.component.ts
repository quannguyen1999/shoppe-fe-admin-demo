import { Component, Input } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {
  @Input() maxWidth!: string;
  
  chartHeight: string = 'width:100%; height:90%; margin:auto;';

  constructor(private oauthSerivce: OAuthService){
    console.log(oauthSerivce.getAccessToken());
  }
}
