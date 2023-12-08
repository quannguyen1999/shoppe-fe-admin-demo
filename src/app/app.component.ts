import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  maxWidth: string = '1300px';
  currentTabMenu: boolean = true;

  ngOnInit(): void {
      this.currentTabMenu = true;
  }

  onMenuChange(menuChange: boolean): void{
    this.currentTabMenu = menuChange;
  }
}