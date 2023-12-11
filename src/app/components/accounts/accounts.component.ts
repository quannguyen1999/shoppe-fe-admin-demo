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
export class AccountsComponent implements AfterViewInit, OnInit, OnDestroy{

  allColumnHide = ['id']
  allColumnShow = ['username', 'createdAt', 'updatedAt', 'isActive'];

  @Input() currentTabMenu!: boolean;
  
  displayedColumns: string[] = ['id', 'username', 'createdAt', 'updatedAt', 'isActive'];

  dataSource = new MatTableDataSource<Account>(listAccounts);

  //drag - drop
  hide = [...this.allColumnHide];

  show = [...this.allColumnShow];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  //search column 
  controlSearchInputHide = new FormControl('');
  controlSearchInputShow = new FormControl('');

  ngOnInit(): void {
    this.controlSearchInputHide.valueChanges.subscribe(value=>
      {
        this.hide = value === '' ? this.allColumnShow : this.searchValue(value || '');
      }
    );
    this.controlSearchInputShow.valueChanges.subscribe(value=>
      {
        this.show = value === '' ? this.allColumnShow : this.searchValue(value || '');
      }
    );
  }
  
  ngOnDestroy(): void {
   
  }

  private searchValue(value: string): string[] {
    const filterValue = this.convertText(value);
    return this.show.filter(dataFakeSearch => this.convertText(dataFakeSearch).includes(filterValue));
  }

  private convertText(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onChangeFilterColumn(){
    this.displayedColumns = [...this.show];
  }

}
