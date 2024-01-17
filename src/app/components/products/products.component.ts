import { Component, Inject, Input } from '@angular/core';
import { Product, ProductRequestModel } from '../../models/product.model';
import { DEFAULT_PRODUCT_COLUMNS } from '../../constants/column-value';
import { MatTableDataSource } from '@angular/material/table';
import { ProductServiceService } from '../../services/product-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { CreateProductComponent } from './create-product/create-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  //SideBar
  @Input() currentTabMenu!: boolean;

  //Field To Search
  productRequestModel: ProductRequestModel = {
    id: '',
    name: '',
    image: '',
    quantity: 0,
    price: 0,
    discount: 0,
    idCategory: '',
    createFromDate: null,
    createToDate: null,
    listSorted: null,
    listFields: DEFAULT_PRODUCT_COLUMNS
  };

  //Init
  displayedColumns: string[] = DEFAULT_PRODUCT_COLUMNS;
  listColumnShowChange: string[] = [];
  dataSource = new MatTableDataSource<Product>();
  totalPage: number = 0;
  currentPageDefault: number = 0;
  currentSizeDefault: number = 4;
  isLoadingPage: boolean = false;

  constructor(
    @Inject(ProductServiceService) public productService: ProductServiceService,
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
    // const dialogRef = this.dialog.open(CreateProductComponent);
    // dialogRef.componentInstance.dialogCategoryNotification.subscribe(() => {
    //   this.dialog.closeAll();
    //   this.searchData();
    // })
  }

  pageOnChange(event: any){
    this.searchProduct(event.page, event.size, false);
  }

  searchData(){
    this.searchProduct(this.currentPageDefault, this.currentSizeDefault, true);
  }

  exportExcel(){
    this.productRequestModel.listFields = this.listColumnShowChange.length == 0 ? [...DEFAULT_PRODUCT_COLUMNS] : [...this.listColumnShowChange];
    this.productService.exportExcel(this.productRequestModel).subscribe((blob: Blob) => {
      this.commonService.exportExcel(blob, 'exportData.xlsx');
    });
  }

  searchProduct(page: number, size: number, isResetPage: boolean){
    this.isLoadingPage = true;
    
    //reset page
    this.dataSource.data = [];
    this.totalPage = 0;
    this.currentPageDefault = 0;

    //seatch page
    this.productService.getListProduct(page, size, this.displayedColumns, this.productRequestModel)
    .subscribe((data) => {
      this.isLoadingPage = false;
      this.dataSource.data = data.data;
      this.totalPage = data.total;
      this.currentPageDefault = isResetPage ? 0 : data.page;
    })
  }

  openEdit(id: string){
    this.dialog.open(CreateProductComponent,{
      data: {
        id: id
      }
    });
  }

  onSortChange(event: any){
    //add Data
    this.productRequestModel.listSorted = [
      {
        field: event.active,
        value: event.direction
      }
    ]

    //search data
    this.searchData();
  }

}