import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WeatherCardComponent } from './weather-card.component';
import { MatCardModule } from '@angular/material/card';

describe('WeatherCardComponent', () => {
  let component: WeatherCardComponent;
  let fixture: ComponentFixture<WeatherCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule, WeatherCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display title input', () => {
    const title = 'Weather in Kharkiv';
    component.title = title;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.weather-card__title')?.textContent).toContain(title);
  });

});
