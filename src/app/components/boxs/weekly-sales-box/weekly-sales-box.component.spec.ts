import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySalesBoxComponent } from './weekly-sales-box.component';

describe('WeeklySalesBoxComponent', () => {
  let component: WeeklySalesBoxComponent;
  let fixture: ComponentFixture<WeeklySalesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeeklySalesBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeeklySalesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
