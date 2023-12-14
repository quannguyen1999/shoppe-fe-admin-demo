import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-component',
  templateUrl: './title-component.component.html',
  styleUrl: './title-component.component.scss'
})
export class TitleComponentComponent {
  @Input() content: string = '';
  @Input() valueIcon: string = '';
}
