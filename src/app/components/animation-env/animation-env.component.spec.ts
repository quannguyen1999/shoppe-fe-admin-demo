import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimationEnvComponent } from './animation-env.component';

describe('AnimationEnvComponent', () => {
  let component: AnimationEnvComponent;
  let fixture: ComponentFixture<AnimationEnvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimationEnvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimationEnvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
