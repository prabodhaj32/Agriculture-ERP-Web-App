import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartMonitoringComponent } from './smart-monitoring.component';

describe('SmartMonitoringComponent', () => {
  let component: SmartMonitoringComponent;
  let fixture: ComponentFixture<SmartMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmartMonitoringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
