import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartCommonComponent } from './line-chart-common.component';

describe('LineChartCommonComponent', () => {
  let component: LineChartCommonComponent;
  let fixture: ComponentFixture<LineChartCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineChartCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LineChartCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
