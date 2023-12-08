import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Output() menuChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentTabMenu!: boolean;
  
  @Input() maxWidth!: string;

  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}

  menuOnChange(){
    this.currentTabMenu = !this.currentTabMenu;
    this.menuChange.emit(this.currentTabMenu);
  }
  
  ngOnInit() {
    this.currentTabMenu = true;
    this.items = [
      {
          label: 'Light',
          icon: 'pi pi-fw pi-moon ',
          
          command: () => {
            this.update();
        }
      },
      {
          label: 'Dark',
      
          icon: 'pi pi-fw pi-sun',
          command: () => {
            this.update();
        }
      },
      {
        label: 'Both',
       
        icon: 'pi pi-fw pi-slack',
        command: () => {
          this.update();
      }
      }
  ];
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }
}

function OutPut(): (target: HeaderComponent, propertyKey: "menuChange") => void {
  throw new Error('Function not implemented.');
}
