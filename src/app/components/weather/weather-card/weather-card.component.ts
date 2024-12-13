import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// material
import { MatCardModule } from '@angular/material/card';

// models
import { WeatherEntry } from '../../../models';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrl: './weather-card.component.scss',
  standalone: true,
  imports: [MatCardModule, CommonModule]
})
export class WeatherCardComponent {
  @Input() weather = {} as WeatherEntry;
  @Input() title = '';
}
