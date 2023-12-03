import { Component, ElementRef, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { EchartUtilService } from '../../servies/echart-util.service';

@Component({
  selector: 'app-dashboard',
  template: '<div #echartsContainer class="echarts-container"></div>',
  styles: [`
    .echarts-container {
      height: 300px;
    }
  `],

})
export class DashboardComponent  implements OnInit {
  // Assume you have chartOptions defined
  chartOption: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
      },
    ],
  };
  constructor(private echartsService: EchartUtilService, private elementRef: ElementRef) {}

  ngOnInit() {
    const container = this.elementRef.nativeElement.querySelector('.echarts-container');
    this.echartsService.initializeEcharts(container, this.chartOption);
  }
}