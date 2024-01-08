import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { startWith, switchMap } from 'rxjs';
import { Account } from '../../../models/account.model';
import { CommonPageInfo } from '../../../models/common-page.model';
import { MatSort, Sort } from '@angular/material/sort';
@Component({
  selector: 'app-table-util-component',
  templateUrl: './table-util-component.component.html',
  styleUrl: './table-util-component.component.scss'
})
export class TableUtilComponentComponent implements OnInit{

  @Input() displayedColumns: string[] = [];

  @Input() dataSource: any;

  @Input() contentButton!: string;

  @Input() totalPage!: number;

  @Input() currentPage!: number;

  @Input() currentSize!: number;

  @Input() isLoadingPage!: boolean;

  @Output() editOnChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() removeOnChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() dataSortChange: EventEmitter<{active: string, direction: string}> = new EventEmitter<{active: string, direction: string}>();

  @Output() searchData: EventEmitter<{ page: number; size: number }> = new EventEmitter<{ page: number; size: number }>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listColumnShowChange: string[] = [];
  
  ngOnInit(): void {
  
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  openEdit(number: string){
    this.editOnChange.emit(number);
  }

  openRemove(number: string){
    this.removeOnChange.emit(number);
  }

  onChangePage(event: any){
    this.searchData.emit({
        page: event.pageIndex,
        size: this.currentSize,
    });
  }

  onSortChange(sort: Sort){
    if(sort.direction == 'asc' || sort.direction == 'desc'){
      this.dataSortChange.emit({
        active: sort.active,
        direction: sort.direction
      });
    }
  }

}
