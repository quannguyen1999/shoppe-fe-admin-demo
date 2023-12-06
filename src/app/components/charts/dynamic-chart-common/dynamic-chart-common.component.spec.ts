import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicChartCommonComponent } from './dynamic-chart-common.component';

describe('DynamicChartCommonComponent', () => {
  let component: DynamicChartCommonComponent;
  let fixture: ComponentFixture<DynamicChartCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicChartCommonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DynamicChartCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
