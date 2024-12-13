import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherDashboardComponent } from './components/weather/weather-dashboard/weather-dashboard.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherService } from './services';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        {provide: WeatherService, useValue: {}},
      ],
      imports: [AppComponent, WeatherDashboardComponent], // Include standalone components
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain the WeatherDashboardComponent', () => {
    const weatherDashboard = fixture.debugElement.query(By.css('app-weather-dashboard'));
    expect(weatherDashboard).toBeTruthy();
  });
});
