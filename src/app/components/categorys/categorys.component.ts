import { Component, Inject, Input, OnInit } from '@angular/core';
import { Account } from '../../models/account.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AccountServiceService } from '../../services/account-service.service';
import { DEFAULT_ACCOUNT_COLUMNS, DEFAULT_CATEGORY_COLUMNS } from '../../constants/column-value';
import { CommonService } from '../../services/common.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { CagegoryRequestModel, Category } from '../../models/category.model';
import { CategoryServiceService } from '../../services/category-service.service';
import { CreateCategoryComponent } from './create-category/create-category.component';
@Component({
  selector: 'app-categorys',
  templateUrl: './categorys.component.html',
  styleUrl: './categorys.component.scss'
})
export class CategorysComponent {
  //SideBar
  @Input() currentTabMenu!: boolean;
  
  //Field To Search
  categoryRequestModel: CagegoryRequestModel = {
    id: '',
    name: '',
    image: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: DEFAULT_ACCOUNT_COLUMNS
  };

  //Init
  displayedColumns: string[] = DEFAULT_CATEGORY_COLUMNS;
  listColumnShowChange: string[] = [];
  dataSource = new MatTableDataSource<Category>();
  totalPage: number = 0;
  currentPageDefault: number = 0;
  currentSizeDefault: number = 4;
  isLoadingPage: boolean = false;

  constructor(
    @Inject(CategoryServiceService) public categoryService: CategoryServiceService,
    private dialog: MatDialog,
    private commonService: CommonService,
    private toastrService: ToastServiceService
  ) {
    this.searchData();
  }

  onColumnShowChange(listValue: string[]){
    this.listColumnShowChange = listValue;
  }

  onChangeFilterColumn(){
    this.displayedColumns = [...this.listColumnShowChange];
  }

  openDialogForm() {
    const dialogRef = this.dialog.open(CreateCategoryComponent);
    dialogRef.componentInstance.dialogCategoryNotification.subscribe(() => {
      this.dialog.closeAll();
      this.searchData();
    })
  }

  pageOnChange(event: any){
    this.searchCategory(event.page, event.size, false);
  }

  searchData(){
    this.searchCategory(this.currentPageDefault, this.currentSizeDefault, true);
  }

  exportExcel(){
    this.categoryRequestModel.listFields = this.listColumnShowChange.length == 0 ? [...DEFAULT_CATEGORY_COLUMNS] : [...this.listColumnShowChange];
    this.categoryService.exportExcel(this.categoryRequestModel).subscribe((blob: Blob) => {
      this.commonService.exportExcel(blob, 'exportData.xlsx');
    });
  }

  searchCategory(page: number, size: number, isResetPage: boolean){
    this.isLoadingPage = true;
    
    //reset page
    this.dataSource.data = [];
    this.totalPage = 0;
    this.currentPageDefault = 0;

    //seatch page
    this.categoryService.getListCategory(page, size, this.displayedColumns, this.categoryRequestModel)
    .subscribe((data) => {
      this.isLoadingPage = false;
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = isResetPage ? 0 : data.page;
    },
    (error) => {
      this.isLoadingPage = false;
      this.toastrService.getPopUpErrorTypeString("Internal Server Error");
    })
  }

  openEdit(id: string){
    this.dialog.open(CreateCategoryComponent,{
      data: {
        id: id
      }
    });
  }

  onSortChange(event: any){
    //add Data
    this.categoryRequestModel.listSorted = [
      {
        field: event.active,
        value: event.direction
      }
    ]

    //search data
    this.searchData();
  }

}