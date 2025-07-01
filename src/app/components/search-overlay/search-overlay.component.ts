import { Component, inject, model } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-overlay',
  imports: [],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {

  searchBarService = inject(SearchBarService)
  router = inject (Router)

  search = model.required<string>();
  overlay = model.required<boolean>();
  currentSearch = model.required<string>();

  handleClick() {
    this.overlay.set(false);
    this.currentSearch.set(this.search())
    this.searchBarService.moveResearchToTop(this.search())
    this.router.navigate(['home'], { queryParams: { s: this.search() } })
  }

  handleDeleteSearch() { 
    this.overlay.set(true);
    this.searchBarService.removeResearch(this.search())
  }
}
