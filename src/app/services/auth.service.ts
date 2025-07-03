import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { config } from '../app.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oAuthService = inject(OAuthService)
  
  currAccessToken = signal<string | null>(null);
  isLogged = computed(() => this.currAccessToken() !== null)
  claims = computed(() => this.isLogged() ? this.oAuthService.getIdentityClaims() : null)
  username = computed(() => this.claims() !== null ? this.claims()!["preferred_username"] : null)
  subject = computed(() => this.claims() !== null ? this.claims()!["sub"] : null)

  constructor() {
    this.oAuthService.configure(config);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        this.currAccessToken.set(this.oAuthService.getAccessToken());
      }
    });
  }

  login() {
    this.oAuthService.initCodeFlow()
  }

  logout() {
    this.oAuthService.logOut()
  }
}
