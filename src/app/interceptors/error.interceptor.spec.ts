import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MatDialog } from '@angular/material/dialog';
import { ErrorInterceptor } from './error.interceptor';
import { of } from 'rxjs';


// Mock the MatDialog
class MockMatDialog {
  open = jasmine.createSpy('open').and.returnValue({
    afterClosed: () => of(true),
  });
}

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let dialog: MockMatDialog;

  beforeEach(() => {
    dialog = new MockMatDialog();

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorInterceptor,
          multi: true,
        },
        {provide: MatDialog, useValue: dialog},
      ],
    });


    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should open a dialog when an error occurs', () => {
    httpClient.get('/api/data').subscribe(
      () => fail('should have failed with the 404 error'),
      (error) => {
        console.log(error.message);
        expect(error.message).toBe('Http failure response for /api/data: 404 Not Found');
      }
    );

    const req = httpTestingController.expectOne('/api/data');
    req.flush('error', {status: 404, statusText: 'Not Found'});
  });


});
