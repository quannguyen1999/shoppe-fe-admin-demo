import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalOrderBoxComponent } from './total-order-box.component';

describe('TotalOrderBoxComponent', () => {
  let component: TotalOrderBoxComponent;
  let fixture: ComponentFixture<TotalOrderBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalOrderBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalOrderBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
