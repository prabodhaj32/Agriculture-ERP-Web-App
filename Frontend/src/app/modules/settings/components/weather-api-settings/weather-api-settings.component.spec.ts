import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherApiSettingsComponent } from './weather-api-settings.component';

describe('WeatherApiSettingsComponent', () => {
  let component: WeatherApiSettingsComponent;
  let fixture: ComponentFixture<WeatherApiSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherApiSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherApiSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
