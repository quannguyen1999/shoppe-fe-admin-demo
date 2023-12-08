import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-line-chart-common',
  templateUrl: './line-chart-common.component.html',
  styleUrl: './line-chart-common.component.scss'
})
export class LineChartCommonComponent implements OnInit{
  @Input() heightChart!: String;
  ngOnInit(): void {
  }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive:true,
    // maintainAspectRatio: false,
    scales: {
       y: {
        beginAtZero: true,
      },
    },
  };

  public lineChartType: ChartType = 'line';
}
