import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartCommonComponent } from './pie-chart-common.component';

describe('PieChartCommonComponent', () => {
  let component: PieChartCommonComponent;
  let fixture: ComponentFixture<PieChartCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PieChartCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
