import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-table-util-component',
  templateUrl: './table-util-component.component.html',
  styleUrl: './table-util-component.component.scss'
})
export class TableUtilComponentComponent implements OnInit{
  @Input() displayedColumns: string[] = [];

  @Input() dataSource: any;

  @Input() contentButton!: string;

  @Output() dialogOnChange: EventEmitter<any> = new EventEmitter<any>();

  @Output() editOnChange: EventEmitter<string> = new EventEmitter<string>();

  @Output() removeOnChange: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listColumnShowChange: string[] = [];
  
  ngOnInit(): void {
  
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogForm(){
    this.dialogOnChange.emit();
  }

  openEdit(number: string){
    this.editOnChange.emit(number);
  }

  openRemove(number: string){
    this.removeOnChange.emit(number);
  }



}