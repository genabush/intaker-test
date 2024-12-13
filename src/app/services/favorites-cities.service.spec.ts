import { TestBed } from '@angular/core/testing';
import { FavoritesCitiesService } from './favorites-cities.service';

describe('FavoritesCitiesService', () => {
  let service: FavoritesCitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FavoritesCitiesService],
    });
    service = TestBed.inject(FavoritesCitiesService);
    localStorage.clear();
  });


  it('should add a city to favorites', () => {
    const city = 'Kharkiv';
    expect(service.favoriteCitiesSub$.getValue()).toEqual([]);
    service.addCityToFavorites(city);
    expect(service.favoriteCitiesSub$.getValue()).toEqual([city]);
    expect(localStorage.getItem('favoriteCities')).toContain(city);
  });


  it('should select a favorite city and update it', () => {
    const city = 'Kharkiv';
    service.addCityToFavorites(city);
    service.selectFavoriteCity(city);
    expect(service.selectedFavoriteCitySub$.getValue()).toEqual(city);
  });

  it('should select a city that is not in favorites and return an empty string', () => {
    const city = 'bbbbb';
    service.selectFavoriteCity(city);
    expect(service.selectedFavoriteCitySub$.getValue()).toEqual('');
  });

  it('should fetch favorite cities from localStorage', () => {
    const city1 = 'Kharkiv';
    const city2 = 'Paris';
    service.addCityToFavorites(city1);
    service.addCityToFavorites(city2);
    service.getFavoriteCitiesFromStorageToObs().subscribe((favorites) => {
      expect(favorites).toEqual([city1, city2]);
    });
  });

  it('should handle case insensitivity when selecting a city', () => {
    const city = 'Kharkiv';
    service.addCityToFavorites(city);
    service.selectFavoriteCity('Kharkiv');
    expect(service.selectedFavoriteCitySub$.getValue()).toEqual(city);
  });

  it('should return an empty list when no favorite cities are stored in localStorage', () => {
    service.getFavoriteCitiesFromStorageToObs().subscribe((favorites) => {
      expect(favorites).toEqual([]);
    });
  });
});
