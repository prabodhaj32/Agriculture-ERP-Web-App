import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldUnitFormComponent } from './field-unit-form.component';

describe('FieldUnitFormComponent', () => {
  let component: FieldUnitFormComponent;
  let fixture: ComponentFixture<FieldUnitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldUnitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldUnitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
