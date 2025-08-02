import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBuyerDialogComponent } from './add-buyer-dialog.component';

describe('AddBuyerDialogComponent', () => {
  let component: AddBuyerDialogComponent;
  let fixture: ComponentFixture<AddBuyerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBuyerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBuyerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
