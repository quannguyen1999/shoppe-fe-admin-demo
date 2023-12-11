import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-drag-drop-column',
  templateUrl: './drag-drop-column.component.html',
  styleUrl: './drag-drop-column.component.scss'
})
export class DragDropColumnComponent implements OnInit{
  
  columnSaveHide: string[] = [];
  @Input() columnSaveShow: string[] = [];

  @Output() allColumnAreShowing: EventEmitter<string[]> = new EventEmitter<string[]>();

  //drag - drop
  hide: string[] = [];
  show:string[] = [];

  controlSearchInputHide = new FormControl('');
  controlSearchInputShow = new FormControl('');

  ngOnInit(): void {
    this.hide = [...this.columnSaveHide];
    this.show = [...this.columnSaveShow];

    this.controlSearchInputHide.valueChanges.subscribe(value=>
      {
        this.hide = value === '' ? this.columnSaveHide : this.searchValue(value || '', this.hide);
      }
    );
    this.controlSearchInputShow.valueChanges.subscribe(value=>
      {
        this.show = value === '' ? this.columnSaveShow : this.searchValue(value || '', this.show);
      }
    );
  }

  private searchValue(value: string, listValue: string[]): string[] {
    const filterValue = this.convertText(value);
    return listValue.filter(data => this.convertText(data).includes(filterValue));
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

      this.columnSaveHide = [...this.hide];
      this.columnSaveShow = [...this.show];

      this.allColumnAreShowing.emit(this.columnSaveShow);
    }
  }


}
