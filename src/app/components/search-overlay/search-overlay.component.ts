import { Component, effect, inject, input, model } from '@angular/core';
import { SearchBarService } from '../../services/search-bar.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-overlay',
  imports: [CommonModule],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {

  searchBarService = inject(SearchBarService)
  router = inject (Router)

  focused = input.required<boolean>()
  search = model.required<string>();
  overlay = model.required<boolean>();
  currentSearch = model.required<string>();

  focusdebug = effect(() => console.log(`item ${this.search()}, focus ${this.focused()}`))

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
