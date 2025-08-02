import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductivityCostComponent } from './productivity-cost.component';

describe('ProductivityCostComponent', () => {
  let component: ProductivityCostComponent;
  let fixture: ComponentFixture<ProductivityCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductivityCostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductivityCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
