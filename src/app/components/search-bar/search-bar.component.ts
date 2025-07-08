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

  currentSearch = model.required<string>();
  searchControl = new FormControl<string>('')

  handleSearch() {
    if (this.searchControl.value !== '') {
      const research = this.searchControl.value!
      this.currentSearch.set(research)
      this.searchBarService.addResearch(research)
      this.route.navigate(['home'], { queryParams: { s: research } })
    }
    return
  }

  clearCurrentSearch(event: Event) {
    event.stopPropagation()
    this.searchControl.reset();
    this.showOverlay.set(false)
  }

}
