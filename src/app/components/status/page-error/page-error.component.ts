import { Component, OnInit } from '@angular/core';
import { LocalStorageCustomService } from '../../../services/local-storage-custom.service';
import { NUMBER_TRY_REQUEST } from '../../../constants/constant-value-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.scss'
})
export class PageErrorComponent implements OnInit{

  constructor(private router: Router){

  }

  ngOnInit(): void {
    // const currentValue = Number.parseInt((this.localStorageCustom.getWithExpiry(NUMBER_TRY_REQUEST) || '0'));
   
    // this.localStorageCustom.setWithExpiry(NUMBER_TRY_REQUEST, (currentValue + 1).toString(), 5000);

    // console.log(Number.parseInt((this.localStorageCustom.getWithExpiry(NUMBER_TRY_REQUEST) || '0')))

  }

  redirectToHomePage(): void{
    this.router.navigate(['/']);
  }

}
