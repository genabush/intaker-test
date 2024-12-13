import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FavoritesListComponent } from './favorites-list.component';
import { FavoritesCitiesService } from '../../../services';

class MockFavoritesCitiesService {
  selectFavoriteCity(favoritesCity: string): void {
  }
}

describe('FavoritesListComponent', () => {
  let component: FavoritesListComponent;
  let fixture: ComponentFixture<FavoritesListComponent>;
  let favoritesCitiesService: MockFavoritesCitiesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MatMenuModule, MatButtonModule, FavoritesListComponent],
      providers: [
        {provide: FavoritesCitiesService, useClass: MockFavoritesCitiesService},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesListComponent);
    component = fixture.componentInstance;
    favoritesCitiesService = TestBed.inject(FavoritesCitiesService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should call selectFavoriteCity method when a city is selected', () => {
    spyOn(favoritesCitiesService, 'selectFavoriteCity');
    const favoriteCity = 'Kharkiv';

    component.selectFavoriteCity(favoriteCity);

    expect(favoritesCitiesService.selectFavoriteCity).toHaveBeenCalledWith(favoriteCity);
  });
});
