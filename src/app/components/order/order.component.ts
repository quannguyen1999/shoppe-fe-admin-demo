import { Component, Inject, Input } from '@angular/core';
import { Order, OrderRequestModel } from '../../models/order.model';
import { DEFAULT_ORDER_COLUMNS } from '../../constants/column-value';
import { MatTableDataSource } from '@angular/material/table';
import { OrderServiceService } from '../../services/order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { ToastServiceService } from '../../services/toast-service.service';
import { CreateOrderComponent } from './create-order/create-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
   //SideBar
   @Input() currentTabMenu!: boolean;
  
   //Field To Search
   orderRequestModel: OrderRequestModel = {
     id: '',
     createFromDate: null,
     createToDate: null,
     listSorted: null,
     listFields: DEFAULT_ORDER_COLUMNS
   };
 
   //Init
   displayedColumns: string[] = DEFAULT_ORDER_COLUMNS;
   listColumnShowChange: string[] = [];
   dataSource = new MatTableDataSource<Order>();
   totalPage: number = 0;
   currentPageDefault: number = 0;
   currentSizeDefault: number = 4;
   isLoadingPage: boolean = false;
 
   constructor(
     @Inject(OrderServiceService) public orderService: OrderServiceService,
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
     const dialogRef = this.dialog.open(CreateOrderComponent);
     dialogRef.componentInstance.dialogOrderNotification.subscribe(() => {
       this.dialog.closeAll();
       this.searchData();
     })
   }
 
   pageOnChange(event: any){
     this.searchOrder(event.page, event.size, false);
   }
 
   searchData(){
     this.searchOrder(this.currentPageDefault, this.currentSizeDefault, true);
   }
 
   exportExcel(){
     this.orderRequestModel.listFields = this.listColumnShowChange.length == 0 ? [...DEFAULT_ORDER_COLUMNS] : [...this.listColumnShowChange];
     this.orderService.exportExcel(this.orderRequestModel).subscribe((blob: Blob) => {
       this.commonService.exportExcel(blob, 'exportData.xlsx');
     });
   }
 
   searchOrder(page: number, size: number, isResetPage: boolean){
     this.isLoadingPage = true;
     
     //reset page
     this.dataSource.data = [];
     this.totalPage = 0;
     this.currentPageDefault = 0;
 
     //seatch page
     this.orderService.getListOrder(page, size, this.displayedColumns, this.orderRequestModel)
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
     this.dialog.open(CreateOrderComponent,{
       data: {
         id: id
       }
     });
   }
 
   onSortChange(event: any){
     //add Data
     this.orderRequestModel.listSorted = [
       {
         field: event.active,
         value: event.direction
       }
     ]
 
     //search data
     this.searchData();
   }
}
