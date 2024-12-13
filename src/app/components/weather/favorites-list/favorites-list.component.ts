import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

// @angular/material
import { MatMenuModule } from '@angular/material/menu';

// models
import { MatButton } from '@angular/material/button';

// services
import { FavoritesCitiesService } from '../../../services';

@Component({
  selector: 'app-favorites-list',
  imports: [CommonModule, MatMenuModule, MatButton],
  templateUrl: './favorites-list.component.html',
  styleUrl: './favorites-list.component.scss',
  standalone: true,
})
export class FavoritesListComponent {
  @Input() favoritesCities: string[] = [];

  constructor(private favoritesCitiesService: FavoritesCitiesService) {
  }

  selectFavoriteCity(favoritesCity: string): void {
    this.favoritesCitiesService.selectFavoriteCity(favoritesCity);
  }

}
