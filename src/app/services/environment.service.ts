import { Injectable } from '@angular/core';

// environments
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService {
  constructor() {
  }

  getApiUrl(): string {
    return environment.apiUrl;
  }

  getApiKey(): string {
    return environment.apiKey;
  }

}
