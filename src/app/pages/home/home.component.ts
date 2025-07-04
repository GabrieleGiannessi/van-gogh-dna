import { Component, computed, HostListener, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { ActivatedRoute } from '@angular/router';
import { SearchBarService } from '../../services/search-bar.service';
import { AuthService } from '../../services/auth.service';
import { ToastsComponent } from "../../components/toasts/toasts.component";
@Component({
  selector: 'app-home',
  imports: [DocumentListComponent, SearchBarComponent, ToastsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  route = inject(ActivatedRoute);
  searchBarService = inject(SearchBarService);
  authService = inject(AuthService)

  showOverlay = this.searchBarService.showOverlay;
  searches = this.searchBarService.searches;

  get recentSearches() {
    return this.searches().slice(0, 5);
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const searchBarElement = document.querySelector('#input-container');
    if (!searchBarElement?.contains(event.target as Node)) {
      this.showOverlay.set(false);
    }
  }

  get hasSParam(): boolean {
    return this.route.snapshot.queryParamMap.has('s');
  }
}
