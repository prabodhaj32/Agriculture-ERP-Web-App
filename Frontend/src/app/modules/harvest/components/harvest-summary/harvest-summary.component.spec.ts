import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HarvestSummaryComponent } from './harvest-summary.component';

describe('HarvestSummaryComponent', () => {
  let component: HarvestSummaryComponent;
  let fixture: ComponentFixture<HarvestSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
