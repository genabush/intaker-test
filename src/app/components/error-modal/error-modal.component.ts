import { Component, inject } from '@angular/core';

// material
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

interface ErrorModalData {
  errorMessage: string;
}

@Component({
  selector: 'app-error-modal',
  imports: [MatDialogModule, MatButton,],
  templateUrl: './error-modal.component.html',
  styleUrl: './error-modal.component.scss',
  standalone: true,
})
export class ErrorModalComponent {
  data = inject<ErrorModalData>(MAT_DIALOG_DATA);
}
