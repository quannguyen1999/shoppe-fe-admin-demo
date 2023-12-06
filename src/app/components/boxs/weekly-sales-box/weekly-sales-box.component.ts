import { Component } from '@angular/core';

@Component({
  selector: 'app-weekly-sales-box',
  templateUrl: './weekly-sales-box.component.html',
  styleUrl: './weekly-sales-box.component.scss'
})
export class WeeklySalesBoxComponent {
  chartHeight: string = 'max-width:300px;';
}
