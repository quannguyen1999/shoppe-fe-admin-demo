import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableUtilComponentComponent } from './table-util-component.component';

describe('TableUtilComponentComponent', () => {
  let component: TableUtilComponentComponent;
  let fixture: ComponentFixture<TableUtilComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableUtilComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableUtilComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
