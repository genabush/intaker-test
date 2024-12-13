import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// angular/material
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ErrorStateMatcher } from '@angular/material/core';

// components
import { FavoritesListComponent } from '../favorites-list/favorites-list.component';

// models
import { WeatherEntry } from '../../../models';
import { FavoritesCitiesService } from '../../../services';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-weather-search-form',
  templateUrl: './weather-search-form.component.html',
  styleUrl: './weather-search-form.component.scss',
  imports: [
    FavoritesListComponent,
    MatFormFieldModule,
    MatFormField,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    MatInputModule,
  ],
  standalone: true
})


export class WeatherSearchFormComponent implements OnInit {
  @Output() searchWeatherEmit = new EventEmitter<string>();
  @Output() addCityToFavoritesEmit = new EventEmitter<string>();

  @Input() favoritesCities: string[] = [];
  @Input() weatherPodcast: WeatherEntry[] = [];

  matcher = new MyErrorStateMatcher();
  setCurrentCityForm!: FormGroup;

  constructor(private fb: FormBuilder, private favoritesCitiesService: FavoritesCitiesService) {
  }

  get city(): AbstractControl<any, any> | null {
    return this.setCurrentCityForm?.get('city');
  }

  ngOnInit(): void {
    this.createForm();
    this.setSelectedCityValueToForm();
  }

  searchWeather(): void {
    this.searchWeatherEmit.emit(this.setCurrentCityForm.value.city);
  }

  addCityToFavorites(): void {
    this.addCityToFavoritesEmit.emit(this.city?.value)
  }

  resetForm() {
    this.setCurrentCityForm.reset({
      city: ''
    });
    this.favoritesCitiesService.selectFavoriteCity('');
  }

  private createForm(): void {
    this.setCurrentCityForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  private setSelectedCityValueToForm(): void {
    this.favoritesCitiesService.selectedFavoriteCity$.subscribe(city => {
      this.setCurrentCityForm.patchValue({city});
    });
  }
}
