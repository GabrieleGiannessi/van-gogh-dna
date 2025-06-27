import { effect, inject, Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { googleOAuthConfig, keycloakAuthConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  oAuthService = inject(OAuthService)

  currAccessToken = signal<string | null>(null);

  debug = effect(() => console.log(this.currAccessToken()))
  claims = effect(() => { 
    if (this.currAccessToken() !== null){ 
      console.log (this.oAuthService.getIdentityClaims())
    }
  })

  constructor() {
    const lastProvider = localStorage.getItem('lastProvider');

    if (lastProvider === 'google') {
      this.configure(googleOAuthConfig);
    } else if (lastProvider === 'keycloak') {
      this.configure(keycloakAuthConfig);
    } else {
      return;
    }

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.currAccessToken.set(this.oAuthService.getAccessToken());
      }
    });
  }

  configure(config: AuthConfig) {
    this.oAuthService.configure(config);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(localStorage);
  }

  loginWithGoogle() {
    this.configure(googleOAuthConfig);
    localStorage.setItem('lastProvider', 'google');
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initLoginFlow(); // redirect solo se non autenticato
      } else {
        this.currAccessToken.set(this.oAuthService.getAccessToken())
      }
    });
  }

  loginWithKeycloak() {
    this.configure(keycloakAuthConfig);
    localStorage.setItem('lastProvider', 'keycloak');
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initLoginFlow(); // redirect solo se non autenticato
      } else {
        this.currAccessToken.set(this.oAuthService.getAccessToken())
      }
    });
  }


  logout() {
    this.currAccessToken.set(null)
    this.oAuthService.logOut()
  }

  get name() {
    const claims: any = this.oAuthService.getIdentityClaims();
    return claims ? claims.name : null;
  }

}

export interface UserInterface {
  email: string
  username: string
  savedDocuments: string[]
  recentResearches: string[]
  role: string
}