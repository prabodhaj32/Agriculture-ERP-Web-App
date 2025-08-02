import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CropTypeFormComponent } from './crop-type-form.component';

describe('CropTypeFormComponent', () => {
  let component: CropTypeFormComponent;
  let fixture: ComponentFixture<CropTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropTypeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
