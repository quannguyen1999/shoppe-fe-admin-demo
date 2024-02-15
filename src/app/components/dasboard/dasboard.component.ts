import { Component, Input, OnDestroy } from '@angular/core';
@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent implements OnDestroy{
  @Input() maxWidth!: string;
  
  chartHeight: string = 'width:100%; height:90%; margin:auto;';

  constructor(
    ){
   
  }
  ngOnDestroy(): void {
  
  }
}
