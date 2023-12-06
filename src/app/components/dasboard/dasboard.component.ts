import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dasboard',
  templateUrl: './dasboard.component.html',
  styleUrl: './dasboard.component.scss'
})
export class DasboardComponent {
  @Input() maxWidth!: string;
  
  chartHeight: string = 'max-width:700px;margin:auto;';
}
