import { TestBed } from '@angular/core/testing';
import { EnvironmentService } from './environment.service';
import { environment } from '../../environments/environments';

describe('EnvironmentService', () => {
  let service: EnvironmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EnvironmentService],
    });
    service = TestBed.inject(EnvironmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct API URL', () => {
    const apiUrl = service.getApiUrl();
    expect(apiUrl).toBe(environment.apiUrl);
  });

  it('should return the correct API Key', () => {
    const apiKey = service.getApiKey();
    expect(apiKey).toBe(environment.apiKey);
  });
  

});
