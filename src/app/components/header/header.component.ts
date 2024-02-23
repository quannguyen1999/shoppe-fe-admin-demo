import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { AVATAR_IMAGE } from '../../constants/constant-value-model';
import { AccountServiceService } from '../../services/account-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  avatar: string = AVATAR_IMAGE;

  @Output() menuChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  currentTabMenu!: boolean;
  
  currentDate: Date;

  datePipe: DatePipe | undefined;

  constructor(private messageService: MessageService,
    private router: Router,
    private accountService: AccountServiceService
    ) {
      this.datePipe = new DatePipe('en-US');
      this.currentDate = new Date();
      setInterval(() => {
        this.currentDate = new Date();
      }, 1000); // Update the date every second
  }

  menuOnChange(){
    this.currentTabMenu = !this.currentTabMenu;
    this.menuChange.emit(this.currentTabMenu);
  }
  
  ngOnInit() {
    this.currentTabMenu = true;
  }

  update() {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data Updated' });
  }

  delete() {
      this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
  }

  redirectHomePage(){
    this.router.navigate(['/']);
  }

  logout(){
    console.log("clear")
    localStorage.clear();
    this.accountService.requestLoginPage();
  }

  formatCurrentDate(): string {
    return this.datePipe?.transform(this.currentDate, 'dd/MM/yyyy HH:mm:ss') || '';
  }

}