import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  showOverlay = signal<boolean>(false);
  selectedIndex = signal<number>(-1)
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

  get currentSelectedResearch(): string {
    return this.searches()[this.selectedIndex()] ?? null
  }

  get currentSelectedIndex() {
    return this.selectedIndex()
  }

  set currentSelectedIndex(idx: number) {
    this.selectedIndex.set(idx)
  }

  registerResearch(research: string): void {
    if (this.isDuplicateResearch(research)) {
      this.moveResearchToTop(research);
    } else {
      this.addResearch(research);
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

  isDuplicateResearch(research: string): boolean {
    return this.searches().includes(research);
  }


  clear(): void {
    this.searches.set([]);
    localStorage.removeItem('researches');
  }

  navigate(direction: 'up' | 'down'): void {
    const list = this.searches();
    if (!list.length) return;

    this.selectedIndex.update(i => {
      if (direction === 'down') {
        const next = i + 1;
        return next >= list.length ? 0 : next;
      } else {
        const prev = i - 1;
        return prev < 0 ? list.length - 1 : prev;
      }
    });
  }
  
  arrowDown(): void {
    this.navigate('down');
  }

  arrowUp(): void {
    this.navigate('up');
  }





}
