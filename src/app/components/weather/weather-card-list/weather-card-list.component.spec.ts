import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCardListComponent } from './weather-card-list.component';

describe('WeatherCardComponent', () => {
  let component: WeatherCardListComponent;
  let fixture: ComponentFixture<WeatherCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherCardListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(WeatherCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
