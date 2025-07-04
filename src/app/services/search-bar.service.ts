import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  showOverlay = signal<boolean>(false);
  searches = signal<string[]>(this.loadResearches());

  constructor() {
    // Sincronizza localStorage ogni volta che recentSearches cambia
    effect(() => {
      localStorage.setItem('researches', JSON.stringify(this.searches()));
    });
  }

  private loadResearches(): string[] {
    const data = localStorage.getItem('researches');
    try {
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  addResearch(research: string): void {
    this.searches.update(current => {
      if (current.includes(research)) {
        return current;
      }
      return [research, ...current];
    });
  }

  moveResearchToTop(research: string): void {
    this.searches.update(current => {
      if (!current.includes(research)) {
        return current;
      }
      return [research, ...current.filter(item => item !== research)];
    });
  }

  removeResearch(research: string): void {
    this.searches.update(current => current.filter(item => item !== research));
  }

  clear(): void {
    this.searches.set([]);
    localStorage.removeItem('researches');
  }
}
