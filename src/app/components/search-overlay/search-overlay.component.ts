import { Component, model } from '@angular/core';

@Component({
  selector: 'app-search-overlay',
  imports: [],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  search = model.required<string>();
  overlay = model.required<boolean>();
  recentSearches = model.required<string[]>();
  currentSearch = model.required<string>();

  handleClick() {
    this.overlay.set(false);
    this.currentSearch.set(this.search())
  }

  handleDeleteSearch() { 
    this.overlay.set(true);
    this.recentSearches.set(this.recentSearches().filter(search => search !== this.search()));
  }
}
