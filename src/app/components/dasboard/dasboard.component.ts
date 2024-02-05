import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountServiceService } from '../../services/account-service.service';
import { ACCESS_TOKEN } from '../../constants/constant-value-model';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {
  @Input() maxWidth!: string;
  
  chartHeight: string = 'width:100%; height:90%; margin:auto;';

  constructor(private route: ActivatedRoute, private accountService: AccountServiceService){
    this.route.queryParams.subscribe(params => {
      const code = params['code'];
      
      if (code) {
        // Do something with the code, e.g., send it to your backend for token exchange
        console.log('Authorization Code:', code);
        this.accountService.getToken(code);

        // console.log(localStorage.getItem(ACCESS_TOKEN);

      }
    });
  }
}
