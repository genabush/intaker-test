import { Component } from '@angular/core';

// components
import { WeatherDashboardComponent } from './components/weather/weather-dashboard/weather-dashboard.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [WeatherDashboardComponent],
})
export class AppComponent {
}
