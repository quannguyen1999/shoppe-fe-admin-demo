import { AfterViewInit, Component, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { AccountServiceService } from '../../services/account-service.service';

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

  constructor(
    public dialog: MatDialog,
    @Inject(AccountServiceService) public accountService: AccountServiceService
    ) {
    
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
    const dialogRef = this.dialog.open(CreateAccountComponent);
    dialogRef.componentInstance.dialogAccountNotification.subscribe(() => {
      this.dialog.closeAll();
    })

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

  searchData(){
    this.accountService.getListAccount("0", "4", this.displayedColumns)
    .subscribe((data) => {
      console.log(data)
    })
  }

  


}
