import { inject, Injectable, signal } from '@angular/core';
import { AuthService } from './auth.service';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  authService = inject(AuthService);
  databaseService = inject(DatabaseService);
  
  showOverlay = signal<boolean>(false);
  recentSearches = signal<string[]>([]);
  
    constructor() {
        this.loadRecentSearches();
    } 

  loadRecentSearches() {
  }



}
