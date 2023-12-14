import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Account } from '../../models/account.model';
import { listAccounts } from '../../constants/account-value-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/overlay';
import { CreateAccountComponent } from './create-account/create-account.component';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit{

  //table
  displayedColumns: string[] = ['id', 'username', 'createdAt', 'updatedAt', 'isActive', 'function'];
  dataSource = new MatTableDataSource<Account>(listAccounts);
  listColumnShowChange: string[] = [];

  //sideBar
  @Input() currentTabMenu!: boolean;

  constructor(public dialog: MatDialog) {
    
  }
  
  ngOnInit(): void {
  }

  onColumnShowChange(listValue: string[]){
    this.listColumnShowChange = listValue;
  }

  onChangeFilterColumn(){
    this.displayedColumns = [...this.listColumnShowChange];
  }

  openDialogFormAccount() {
    this.dialog.open(CreateAccountComponent);
  }

  openEdit(id: string){
    this.dialog.open(CreateAccountComponent,{
      data: {
        id: id
        // You can add more properties to pass additional data if needed
      }
    });
  }

  openRemove(id: string){
    console.log(id);
  }

  


}
