import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// rxjs
import { map, Observable } from 'rxjs';

// services
import { EnvironmentService } from './environment.service';
import { WeatherEntry } from '../models';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiUrl: string;
  apiKey: string;

  constructor(
    private http: HttpClient,
    private environmentService: EnvironmentService) {
    this.apiUrl = this.environmentService.getApiUrl();
    this.apiKey = this.environmentService.getApiKey();
  }

  getCurrentWeather(city: string): Observable<WeatherEntry> {
    return this.http.get(`${this.apiUrl}/weather?q=${city}&units=metric&appid=${this.apiKey}`) as Observable<WeatherEntry>;
  }

  getWeatherForecastForFiveDays(city: string): Observable<WeatherEntry[]> {
    return this.http.get(`${this.apiUrl}/forecast?q=${city}&units=metric&appid=${this.apiKey}`)
      .pipe(map((data: any) => this.getDataForFiveDaysFromDayBased(data.list)));
  }

  getDataForFiveDaysFromDayBased(weatherEntries: WeatherEntry[]): WeatherEntry[] {
    return weatherEntries.filter((entry: WeatherEntry) => {
      const date = new Date(entry.dt * 1000);
      return date.getHours() === 11;
    });
  }
}
