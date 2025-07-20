import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationFormDialogComponent } from './application-form-dialog.component';

describe('ApplicationFormDialogComponent', () => {
  let component: ApplicationFormDialogComponent;
  let fixture: ComponentFixture<ApplicationFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
