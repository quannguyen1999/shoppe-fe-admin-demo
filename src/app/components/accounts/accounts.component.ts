import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Account } from '../../models/account.model';
import { listAccounts } from '../../constants/account-value-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements AfterViewInit{

  displayedColumns: string[] = ['id', 'username', 'createdAt', 'updatedAt', 'isActive'];
  dataSource = new MatTableDataSource<Account>(listAccounts);

  listColumnShowChange: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() currentTabMenu!: boolean;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onColumnShowChange(listValue: string[]){
    this.listColumnShowChange = listValue;
  }

  onChangeFilterColumn(){
    this.displayedColumns = [...this.listColumnShowChange];
  }

}
