import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// components
import { WeatherCardComponent } from '../weather-card/weather-card.component';

// models
import { WeatherEntry } from '../../../models';

@Component({
  selector: 'app-weather-card-list',
  templateUrl: './weather-card-list.component.html',
  styleUrl: './weather-card-list.component.scss',
  standalone: true,
  imports: [WeatherCardComponent, CommonModule]
})
export class WeatherCardListComponent {
  @Input() weatherPodcast!: WeatherEntry[];
  @Input() currentCity = '';

  trackByFn(_index: number, item: WeatherEntry): number {
    return item.dt;
  }
}
