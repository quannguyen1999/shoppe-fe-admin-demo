import { Component, OnInit } from '@angular/core';
import { AccountServiceService } from './services/account-service.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Menu } from './models/menu.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  maxWidth: string = '1300px';
 
  currentTabMenu: boolean = true;
  
  isLoginPage: boolean = false;

  isSecure: boolean = false;
  isLoading: boolean = true;

  constructor(private accountService: AccountServiceService,
      private route: ActivatedRoute,
      private http: HttpClient
    ){

  }

  async ngOnInit(): Promise<void> {
    this.currentTabMenu = true;
    // Get the current URL
    this.isLoginPage = window.location.pathname == '/login';

    await new Promise(resolve => setTimeout(()=>{
      this.isLoading = false;
      this.isSecure = this.accountService.getToken() != null;
     
    }, 1000)); // 2000 milliseconds delay
  }

  onMenuChange(menuChange: boolean): void{
    this.currentTabMenu = menuChange;
  }

}