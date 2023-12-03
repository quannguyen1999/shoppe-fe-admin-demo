import { Injectable } from '@angular/core';
import * as echarts from 'echarts';

@Injectable({
  providedIn: 'root'
})
export class EchartUtilService {
  initializeEcharts(container: HTMLElement, options: any): void {
    if (typeof window !== 'undefined') {
      const chart = echarts.init(container);
      chart.setOption(options);
    }
  }
}
