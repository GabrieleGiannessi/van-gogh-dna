import { inject, Injectable, signal } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  databaseService = inject(DatabaseService);
  
  showOverlay = signal<boolean>(false);
  recentSearches = signal<string[]>([]);
  



}
