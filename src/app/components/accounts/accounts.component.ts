import { Component, Inject, Input, OnInit } from '@angular/core';
import { Account, AccountRequestModel } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AccountServiceService } from '../../services/account-service.service';
import { DEFAULT_ACCOUNT_COLUMNS } from '../../constants/column-value';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit{
  totalPage: number = 0;
  currentPageDefault: number = 0;
  currentSizeDefault: number = 4;

  //To Know Page is Loading or not
  isLoadingPage: boolean = false;

  //Field To Search
  accountRequestModel: AccountRequestModel = {
    id: '',
    username: '',
    createFromDate: null,
    createToDate: null,
    isActive: true,
    fromBirthday: null,
    toBirthday: null,
    birthday: null,
    gender: null,
    email: null,
    avatar: '',
    listSorted: null
  };

  //Table
  displayedColumns: string[] = DEFAULT_ACCOUNT_COLUMNS;
  dataSource = new MatTableDataSource<Account>();
  listColumnShowChange: string[] = [];

  //SideBar
  @Input() currentTabMenu!: boolean;

  constructor(
    public dialog: MatDialog,
    @Inject(AccountServiceService) public accountService: AccountServiceService,
    private commonService: CommonService
  ) {
    this.searchData();
  }
  
  ngOnInit(): void {}

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
      this.searchData();
    })
  }

  pageOnChange(event: any){
    this.searchAccount(event.page, event.size, false);
  }

  searchData(){
    this.searchAccount(this.currentPageDefault, this.currentSizeDefault, true);
  }

  exportExcel(){
    this.accountService.exportExcel(this.accountRequestModel).subscribe((blob: Blob) => {
      this.commonService.exportExcel(blob, 'exportData.xlsx');
    });
  }

  searchAccount(page: number, size: number, isRestPage: boolean){
    this.isLoadingPage = true;
    
    //reset page
    this.dataSource.data = [];
    this.totalPage = 0;
    this.currentPageDefault = 0;

    //seatch page
    this.accountService.getListAccount(page, size, this.displayedColumns, this.accountRequestModel)
    .subscribe((data) => {
      this.isLoadingPage = false;
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = isRestPage ? 0 : data.page;
    })
  }

  openEdit(id: string){
    this.dialog.open(CreateAccountComponent,{
      data: {
        id: id
      }
    });
  }

  openRemove(id: string){
   
  }

  onSortChange(event: any){
    //add Data
    this.accountRequestModel.listSorted = [
      {
        field: event.active,
        value: event.direction
      }
    ]

    //search data
    this.searchData();
  }


}
