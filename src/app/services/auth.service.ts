import { inject, Injectable, signal } from '@angular/core';
import { OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { oAuthConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  oAuthService = inject(OAuthService)

  currAccessToken = signal<string | null>(null);

  constructor() {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler();
    this.oAuthService.setStorage(localStorage);

    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (this.oAuthService.hasValidAccessToken()) {
        const token: string = this.getAccessToken();
        this.currAccessToken.set(token)
      }
    });
  }

  loginWithGoogle() {
    this.oAuthService.initCodeFlow();
  }

  loginWithCredentials(username: string, password: string): Promise<TokenResponse> {
    return this.oAuthService.fetchTokenUsingPasswordFlow(username, password)
  }

  logout() {
    this.currAccessToken.set(null)
    this.oAuthService.logOut()
  }

  getUserProfileEmail(): any {
    return this.oAuthService.getIdentityClaims()['email'];
  }

  getAccessToken(): string {
    return this.oAuthService.getAccessToken();
  }
}

export interface UserInterface {
  email: string
  username: string
  savedDocuments: string[]
  recentResearches: string[]
  role: string
}