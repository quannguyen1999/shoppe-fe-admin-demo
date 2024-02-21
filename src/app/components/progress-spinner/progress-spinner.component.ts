import { Component } from '@angular/core';
@Component({
  selector: 'app-progress-spinner',
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss'
})
export class ProgressSpinnerComponent{
  isLoading: boolean = false;
  constructor() {
  }
}
