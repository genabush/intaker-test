import { Injectable } from '@angular/core';

// rxjs
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesCitiesService {
  selectedFavoriteCitySub$ = new BehaviorSubject<string>('');
  selectedFavoriteCity$ = this.selectedFavoriteCitySub$.asObservable();

  favoriteCitiesSub$ = new BehaviorSubject<string[]>([]);
  favoriteCities$ = this.favoriteCitiesSub$.asObservable();

  addCityToFavorites(city: string): void {
    const favorites = this.getFavoriteCitiesFromStorage();
    if (!favorites.includes(city)) {
      favorites.push(city);
      this.saveFavoriteCitiesToStorage(favorites);
    }
  }

  selectFavoriteCity(city: string): void {
    const favoriteCities = this.getFavoriteCitiesFromStorage().find(cityName => cityName.toLowerCase() === city.toLowerCase());
    this.selectedFavoriteCitySub$.next(favoriteCities || '');
  }

  getFavoriteCitiesFromStorageToObs(): Observable<string[]> {
    this.favoriteCitiesSub$.next(this.getFavoriteCitiesFromStorage());
    return this.favoriteCities$;
  }

  private saveFavoriteCitiesToStorage(favorites: string[]): void {
    localStorage.setItem('favoriteCities', JSON.stringify(favorites));
    this.favoriteCitiesSub$.next(favorites);
  }

  private getFavoriteCitiesFromStorage(): string[] {
    const storedFavorites = localStorage.getItem('favoriteCities');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  }

}
