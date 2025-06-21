import { inject, Injectable, signal } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { oAuthConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  oAuthService = inject(OAuthService)

  currentUser = signal<User | null>(null);

  constructor() {
    this.oAuthService.configure(oAuthConfig);
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
            role: 'user' // Default role, can be changed based on your logic
          })
        }).catch(err => {
          console.error('Error loading user profile', err);
        });
      }
    });
  }

  logout() {
    this.oAuthService.logOut();
  }

}

export interface User {
  email: string
  username: string
  savedDocuments: string[]
  role: string
}