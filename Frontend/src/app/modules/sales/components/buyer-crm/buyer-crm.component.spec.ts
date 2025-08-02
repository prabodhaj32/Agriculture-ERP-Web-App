import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerCrmComponent } from './buyer-crm.component';

describe('BuyerCrmComponent', () => {
  let component: BuyerCrmComponent;
  let fixture: ComponentFixture<BuyerCrmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyerCrmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyerCrmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
