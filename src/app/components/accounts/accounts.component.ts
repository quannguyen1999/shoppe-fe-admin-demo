import { Component, Inject, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountServiceService } from '../../services/account-service.service';
import { accountColumns } from '../../constants/column-value';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit{
  totalPage: number = 0;
  currentPageDefault: number = 0;
  currentSizeDefault: number = 2;

  //table
  displayedColumns: string[] = accountColumns;
  dataSource = new MatTableDataSource<Account>();
  listColumnShowChange: string[] = [];

  //sideBar
  @Input() currentTabMenu!: boolean;

  constructor(
    public dialog: MatDialog,
    @Inject(AccountServiceService) public accountService: AccountServiceService
  ) {
    this.searchData();
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

  pageOnChange(event: any){
    this.accountService.getListAccount(event.page, event.size, this.displayedColumns)
    .subscribe((data) => {
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = data.page;
    })
  }

  searchData(){
    console.log("it work bitch")
    this.accountService.getListAccount(this.currentPageDefault, this.currentSizeDefault, this.displayedColumns)
    .subscribe((data) => {
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = 0;
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
    // console.log(id);
  }



  


}
