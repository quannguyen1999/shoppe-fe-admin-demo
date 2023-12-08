import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-pie-chart-common',
  templateUrl: './pie-chart-common.component.html',
  styleUrl: './pie-chart-common.component.scss'
})
export class PieChartCommonComponent {
  @Input() heightChart!: String;
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'],
    datasets: [
      {
        data: [300, 500, 100],
      },
    ],
  };
   // Pie
   public pieChartOptions: ChartConfiguration['options'] = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartType: ChartType = 'pie';


}
