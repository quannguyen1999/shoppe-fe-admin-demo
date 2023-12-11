import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropColumnComponent } from './drag-drop-column.component';

describe('DragDropColumnComponent', () => {
  let component: DragDropColumnComponent;
  let fixture: ComponentFixture<DragDropColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DragDropColumnComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragDropColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
