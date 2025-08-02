import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FertilizerTypeFormComponent } from './fertilizer-type-form.component';

describe('FertilizerTypeFormComponent', () => {
  let component: FertilizerTypeFormComponent;
  let fixture: ComponentFixture<FertilizerTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FertilizerTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FertilizerTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
