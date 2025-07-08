import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { config } from '../app.config';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { filter } from 'rxjs';

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
      this.syncToken();
    });

    this.oAuthService.events
      .pipe(
        filter((e: OAuthEvent) => e.type === 'token_received' || e.type === 'session_terminated')
      )
      .subscribe(() => {
        this.syncToken();
      });
  }

  private syncToken() {
    if (this.oAuthService.hasValidAccessToken()) {
      this.currAccessToken.set(this.oAuthService.getAccessToken());
    } else {
      this.currAccessToken.set(null);
    }
  }

  login() {
    this.oAuthService.initCodeFlow()
  }

  logout() {
    this.oAuthService.logOut()
    this.currAccessToken.set(null)
  }
}
