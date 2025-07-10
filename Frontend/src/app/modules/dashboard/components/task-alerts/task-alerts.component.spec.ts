import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAlertsComponent } from './task-alerts.component';

describe('TaskAlertsComponent', () => {
  let component: TaskAlertsComponent;
  let fixture: ComponentFixture<TaskAlertsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAlertsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
