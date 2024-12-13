import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherDashboardComponent } from './weather-dashboard.component';
import { FavoritesCitiesService, WeatherService } from '../../../services';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WeatherCardListComponent } from '../weather-card-list/weather-card-list.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { WeatherSearchFormComponent } from '../weather-search-form/weather-search-form.component';
import { BehaviorSubject, of } from 'rxjs';
import { WeatherEntry } from '../../../models';
import { CommonModule } from '@angular/common';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Mock WeatherService
const weatherServiceMock = jasmine.createSpyObj<WeatherService>(
  'WeatherService',
  {
    apiUrl: 'https://api.openweathermap.org/data/2.5',
    apiKey: '123',
    getCurrentWeather: of({}),
    getWeatherForecastForFiveDays: of([] as WeatherEntry[]),
    getDataForFiveDaysFromDayBased: of([] as WeatherEntry[])
  } as any
);

// Mock FavoritesCitiesService
const favoritesCitiesServiceMock = jasmine.createSpyObj<FavoritesCitiesService>(
  'FavoritesCitiesService',
  {
    addCityToFavorites: jasmine.createSpy('addCityToFavorites'),
    getFavoriteCitiesFromStorageToObs: of([]),
  } as any
);

// Mock the BehaviorSubject for selectedFavoriteCity$
const selectedFavoriteCitySubject = new BehaviorSubject<string>('Kharkiv');
favoritesCitiesServiceMock.selectedFavoriteCity$ = selectedFavoriteCitySubject.asObservable();

describe('WeatherDashboardComponent', () => {
  let component: WeatherDashboardComponent;
  let fixture: ComponentFixture<WeatherDashboardComponent>;
  let weatherService: WeatherService;
  let favoritesCitiesService: FavoritesCitiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherDashboardComponent,
        WeatherCardListComponent,
        WeatherCardComponent,
        WeatherSearchFormComponent,
        CommonModule,
        NoopAnimationsModule
      ],
      providers: [
        provideHttpClientTesting(),
        {provide: WeatherService, useValue: weatherServiceMock},
        {provide: FavoritesCitiesService, useValue: favoritesCitiesServiceMock},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherDashboardComponent);
    component = fixture.componentInstance;
    weatherService = TestBed.inject(WeatherService);
    favoritesCitiesService = TestBed.inject(FavoritesCitiesService);
  });

  it('should initialize and load data from favorite cities', () => {
    const mockFavoriteCities = ['Kharkiv', 'London'];
    favoritesCitiesServiceMock.getFavoriteCitiesFromStorageToObs.and.returnValue(of(mockFavoriteCities));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.favoritesCities).toEqual(mockFavoriteCities);
  });

  it('should search weather for the selected favorite city', () => {
    const city = 'Kharkiv';
    const mockCurrentWeather = {temperature: 22, city};
    const mockWeatherForecast = [{temperature: 21, city: 'Kharkiv'}];
    weatherServiceMock.getCurrentWeather.and.returnValue(of(mockCurrentWeather as any));
    weatherServiceMock.getWeatherForecastForFiveDays.and.returnValue(of(mockWeatherForecast as any));

    component.searchWeather(city);
    fixture.detectChanges();

    expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(city);
    expect(weatherService.getWeatherForecastForFiveDays).toHaveBeenCalledWith(city);
    expect(component.currentWeather).toEqual(mockCurrentWeather as any);
    expect(component.weatherPodcast).toEqual(mockWeatherForecast as any);
  });

  it('should add city to favorites', () => {
    const city = 'Kharkiv';
    component.addCityToFavorites(city);
    expect(favoritesCitiesService.addCityToFavorites).toHaveBeenCalledWith(city);
  });
});
