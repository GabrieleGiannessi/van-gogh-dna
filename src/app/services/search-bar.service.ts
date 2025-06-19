import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {

  // This service can be used to manage search-related logic, such as fetching recent searches from a server or managing search state.
  showOverlay = signal<boolean>(false);
  recentSearches = signal<string[]>([`"Angular"`, `"TypeScript"`, `"Web Development"`, `"Frontend Frameworks"`]);


  constructor() {}
}
