import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AuthConfig, provideOAuthClient } from 'angular-oauth2-oidc';

export const googleOAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false, 
  clientId: '1080961024913-0cksvg2n701h08k1jkbrk8e5fi6h7qs7.apps.googleusercontent.com',
  redirectUri: window.location.origin + '/home',
  responseType: 'code', 
  scope: 'openid profile email',
  showDebugInformation: true,
  oidc: true,
  disablePKCE: false,
  dummyClientSecret: "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"
}

export const keycloakAuthConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/master',
  redirectUri: window.location.origin + '/home',
  strictDiscoveryDocumentValidation: false, 
  clientId: 'angular-client',
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

