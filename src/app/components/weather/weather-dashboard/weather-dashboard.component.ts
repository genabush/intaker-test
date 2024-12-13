import { Component, OnDestroy, OnInit } from '@angular/core';

// rxjs
import { Subject } from 'rxjs';
import { combineLatestWith, take, takeUntil } from 'rxjs/operators';

// models
import { WeatherEntry } from '../../../models';

// services
import { FavoritesCitiesService, WeatherService } from '../../../services';

// components
import { WeatherCardListComponent } from '../weather-card-list/weather-card-list.component';
import { WeatherCardComponent } from '../weather-card/weather-card.component';
import { WeatherSearchFormComponent } from '../weather-search-form/weather-search-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-dashboard',
  imports: [CommonModule, WeatherCardListComponent, WeatherCardComponent, WeatherCardComponent, WeatherSearchFormComponent],
  templateUrl: './weather-dashboard.component.html',
  styleUrl: './weather-dashboard.component.scss',
  standalone: true
})
export class WeatherDashboardComponent implements OnInit, OnDestroy {
  private cache: Map<string, { timestamp: number; data: [WeatherEntry, WeatherEntry[]] }> = new Map();
  private cacheDuration = 60 * 60 * 1000;
  private unsubscribe$ = new Subject<void>();

  Object = Object;
  currentWeather: WeatherEntry = {} as WeatherEntry;
  weatherPodcast: WeatherEntry[] = [];
  favoritesCities: string[] = [];
  currentCity = '';

  constructor(private weatherService: WeatherService, private favoriteCitiesService: FavoritesCitiesService) {
  }

  searchWeather(city: string): void {
    this.currentCity = city.charAt(0).toUpperCase() + city.slice(1);
    const cachedData = this.cache.get(city);
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < this.cacheDuration) {
      const [currentWeather, weatherPodcast] = cachedData.data;
      this.currentWeather = currentWeather;
      this.weatherPodcast = weatherPodcast;
    } else {
      this.weatherService
        .getCurrentWeather(city)
        .pipe(
          combineLatestWith(this.weatherService.getWeatherForecastForFiveDays(city)),
          take(1)
        )
        .subscribe(([currentWeather, weatherPodcast]: [WeatherEntry, WeatherEntry[]]) => {
          this.cache.set(city, {timestamp: now, data: [currentWeather, weatherPodcast]});
          this.currentWeather = currentWeather;
          this.weatherPodcast = weatherPodcast;
        });
    }
  }

  addCityToFavorites(city: string): void {
    this.favoriteCitiesService.addCityToFavorites(city);
  }

  ngOnInit(): void {
    this.searchWeatherForSelectedFavoriteCity();
    this.getFavoritesCities();
  }

  private searchWeatherForSelectedFavoriteCity(): void {
    this.favoriteCitiesService.selectedFavoriteCity$.pipe(
      takeUntil(this.unsubscribe$))
      .subscribe((selectedFavoriteCity) => {
        if (selectedFavoriteCity.length) {
          this.searchWeather(selectedFavoriteCity);
        }
      });
  }

  private getFavoritesCities(): void {
    this.favoriteCitiesService.getFavoriteCitiesFromStorageToObs()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((favoritesCities) => {
        this.favoritesCities = favoritesCities;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
