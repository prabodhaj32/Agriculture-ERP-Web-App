import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesTrackerComponent } from './sales-tracker.component';

describe('SalesTrackerComponent', () => {
  let component: SalesTrackerComponent;
  let fixture: ComponentFixture<SalesTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
