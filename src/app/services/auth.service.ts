import { inject, Injectable, signal } from '@angular/core';
import { AuthConfig, JwksValidationHandler, OAuthService, TokenResponse } from 'angular-oauth2-oidc';
import { oAuthConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  oAuthService = inject(OAuthService)
  
  currentUser = signal<User | null>(null);

  constructor() {
    this.oAuthService.configure(oAuthConfig);
    this.oAuthService.tokenValidationHandler = new JwksValidationHandler(); // Usa JWKS
    this.oAuthService.loadDiscoveryDocumentAndTryLogin();
  }

  loginWithGoogle() {
    this.oAuthService.loadDiscoveryDocumentAndTryLogin().then(() => {
      if (!this.oAuthService.hasValidAccessToken()) {
        this.oAuthService.initCodeFlow();
      } else {
        this.oAuthService.loadUserProfile().then((user: any) => {
          this.currentUser.set({
            email: user?.email || '',
            username: user?.name || '',
            savedDocuments: [],
            recentResearches: [],
            role: 'user'
          })
        }).catch(err => {
          console.error('Error loading user profile', err);
        });
      }
    });
    console.log(this.oAuthService.getIdentityClaims());
  }

  loginWithCredentials(username: string, password: string): Promise<TokenResponse>{
    return this.oAuthService.fetchTokenUsingPasswordFlow(username, password)
  }

  logout() {
    this.oAuthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  getUserProfile(): any {
    return this.oAuthService.getIdentityClaims();
  }

  getAccessToken(): string {
    return this.oAuthService.getAccessToken();
  }
}

export interface User {
  email: string
  username: string
  savedDocuments: string[]
  recentResearches: string[]
  role: string
}