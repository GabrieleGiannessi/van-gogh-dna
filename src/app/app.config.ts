import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

export const config: AuthConfig = {
  issuer: 'http://localhost:8080/realms/master',
  redirectUri: window.location.origin + '/home',
  strictDiscoveryDocumentValidation: false, 
  clientId: 'van-gogh-dna',
  responseType: 'code',
  scope: 'openid profile email',
  showDebugInformation: true, 
  disablePKCE: false,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideOAuthClient()
  ],
};

