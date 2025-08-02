import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannedVsActualComponent } from './planned-vs-actual.component';

describe('PlannedVsActualComponent', () => {
  let component: PlannedVsActualComponent;
  let fixture: ComponentFixture<PlannedVsActualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlannedVsActualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlannedVsActualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
