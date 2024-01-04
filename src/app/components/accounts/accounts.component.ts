import { Component, Inject, Input, OnInit } from '@angular/core';
import { Account, AccountRequestModel } from '../../models/account.model';
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

  //Field To Search
  accountRequestModel: AccountRequestModel = {
    id: '',
    username: '',
    createFromDate: null,
    createToDate: null,
    isActive: true,
    fromBirthday: null,
    toBirthday: null,
    gender: null
  };

  //Table
  displayedColumns: string[] = accountColumns;
  dataSource = new MatTableDataSource<Account>();
  listColumnShowChange: string[] = [];

  //SideBar
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
    this.searchAccount(event.page, event.size, false);
  }

  searchData(){
    this.searchAccount(this.currentPageDefault, this.currentSizeDefault, true);
  }

  searchAccount(page: number, size: number, isRestPage: boolean){
    this.accountService.getListAccount(page, size, this.displayedColumns, this.accountRequestModel)
    .subscribe((data) => {
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = isRestPage ? 0 : data.page;
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
