import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private messageService: MessageService) {}
  
  ngOnInit() {
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