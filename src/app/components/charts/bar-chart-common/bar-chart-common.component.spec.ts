import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartCommonComponent } from './bar-chart-common.component';

describe('BarChartCommonComponent', () => {
  let component: BarChartCommonComponent;
  let fixture: ComponentFixture<BarChartCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarChartCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarChartCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
