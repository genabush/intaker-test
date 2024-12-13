import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorModalComponent } from './error-modal.component';

describe('ErrorModalComponent', () => {
  let component: ErrorModalComponent;
  let fixture: ComponentFixture<ErrorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatButtonModule, ErrorModalComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: {errorMessage: 'Test error message'},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Detect changes to trigger initial rendering
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the error message passed via MAT_DIALOG_DATA', () => {
    const errorMessage = 'Test error message';
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('.error-message')?.textContent).toContain(errorMessage);
  });

  it('should render close button', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Check if the close button is present and contains the correct text
    const closeButton = compiled.querySelector('button');
    expect(closeButton).toBeTruthy();
    expect(closeButton?.textContent).toContain('Close');
  });
});
