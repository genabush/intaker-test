import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherSearchFormComponent } from './weather-search-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FavoritesCitiesService } from '../../../services';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

class MockFavoritesCitiesService {
  selectedFavoriteCity$ = of('Kharkiv');

  selectFavoriteCity(city: string): void {
  }
}

describe('WeatherSearchFormComponent', () => {
  let component: WeatherSearchFormComponent;
  let fixture: ComponentFixture<WeatherSearchFormComponent>;
  let favoritesCitiesService: MockFavoritesCitiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        WeatherSearchFormComponent,
        BrowserAnimationsModule
      ],
      providers: [
        {provide: FavoritesCitiesService, useClass: MockFavoritesCitiesService},
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherSearchFormComponent);
    component = fixture.componentInstance;
    favoritesCitiesService = TestBed.inject(FavoritesCitiesService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with a city control', () => {
    expect(component.setCurrentCityForm).toBeTruthy();
    expect(component.city).toBeTruthy();
  });

  it('should emit searchWeatherEmit event with city value when searchWeather is called', () => {
    spyOn(component.searchWeatherEmit, 'emit');
    component.setCurrentCityForm.controls['city'].setValue('Kharkiv');
    component.searchWeather();
    expect(component.searchWeatherEmit.emit).toHaveBeenCalledWith('Kharkiv');
  });

  it('should emit addCityToFavoritesEmit event with city value when addCityToFavorites is called', () => {
    spyOn(component.addCityToFavoritesEmit, 'emit');
    component.setCurrentCityForm.controls['city'].setValue('Kharkiv');
    component.addCityToFavorites();
    expect(component.addCityToFavoritesEmit.emit).toHaveBeenCalledWith('Kharkiv');
  });

  it('should reset the form and call selectFavoriteCity on reset', () => {
    spyOn(favoritesCitiesService, 'selectFavoriteCity');
    component.setCurrentCityForm.controls['city'].setValue('Kharkiv');
    component.resetForm();
    expect(component.setCurrentCityForm.value.city).toBe('');

    expect(favoritesCitiesService.selectFavoriteCity).toHaveBeenCalledWith('');
  });

  it('should set initial city value ', () => {
    component.ngOnInit();
    expect(component.city?.value).toBe('Kharkiv');
  });

  it('should display validation errors', () => {
    const cityControl = component.city;
    cityControl?.setValue('');
    fixture.detectChanges();
    expect(cityControl?.errors).toEqual({required: true});

    cityControl?.setValue('A');
    fixture.detectChanges();
    expect(cityControl?.errors).toEqual({
      minlength: {
        requiredLength: 2,
        actualLength: 1
      }
    });
  });
});
