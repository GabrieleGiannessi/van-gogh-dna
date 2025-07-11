import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { SearchOverlayComponent } from "../search-overlay/search-overlay.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchBarService } from '../../services/search-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [SearchOverlayComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  route = inject(Router);
  searchBarService = inject(SearchBarService)

  recentSearches = model.required<string[]>();
  showOverlay = model.required<boolean>();

  currentSearch = model.required<string | undefined>();
  searchControl = new FormControl<string>('')

  handleSearch(): void {
    const research = this.searchControl.value?.trim();
    if (!research) return;

    this.currentSearch.set(research);
    this.searchBarService.registerResearch(research);
    this.route.navigate(['home'], { queryParams: { s: research } });
  }


  handleKeydown($event: KeyboardEvent) {
    const total = this.recentSearches().length
    if ($event.key === 'ArrowUp') {
      this.searchBarService.arrowUp()
      $event.preventDefault();
    }

    if ($event.key === 'ArrowDown') {
      this.searchBarService.arrowDown()
      $event.preventDefault();
    }

    if ($event.key === 'Enter') {
      if (this.searchBarService.selectedIndex() >= 0 && this.searchBarService.selectedIndex() < total) {
        this.searchControl.setValue(this.searchBarService.currentSelectedResearch)
        this.searchBarService.currentSelectedIndex = -1
        this.showOverlay.set(false)
        this.handleSearch()
      } else {
        this.handleSearch();
      }
    }
  }

  clearCurrentSearch(event: Event) {
    event.stopPropagation()
    this.searchControl.reset();
    this.showOverlay.set(false)
  }

}
