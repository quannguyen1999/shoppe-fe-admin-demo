import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { Account } from '../../models/account.model';
import { listAccounts } from '../../constants/account-value-model';
import { MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements AfterViewInit{
  @Input() currentTabMenu!: boolean;
  
  displayedColumns: string[] = ['id', 'username', 'createdAt', 'updatedAt', 'isActive'];

  dataSource = new MatTableDataSource<Account>(listAccounts);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
