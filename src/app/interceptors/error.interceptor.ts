import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

// rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// material
import { MatDialog } from '@angular/material/dialog';

// components
import { ErrorModalComponent } from '../components/error-modal/error-modal.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        errorMessage = (error.error?.message || error.message);
        this.dialog.open(ErrorModalComponent, {
          data: {
            errorMessage: errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1)
          }
        })
        return throwError(() => new Error(errorMessage))
      })
    );
  }
}
