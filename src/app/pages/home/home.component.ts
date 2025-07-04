import { Component, computed, HostListener, inject, signal } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { ActivatedRoute, Router } from '@angular/router';
import { SearchBarService } from '../../services/search-bar.service';
import { AuthService } from '../../services/auth.service';
import { ToastsComponent } from "../../components/toasts/toasts.component";
import { LottieLogoComponent } from "../../components/lottie/lottie.component";
import { DatabaseService, documentType } from '../../services/database.service';
@Component({
  selector: 'app-home',
  imports: [DocumentListComponent, SearchBarComponent, ToastsComponent, LottieLogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  router = inject(Router)
  route = inject(ActivatedRoute);
  searchBarService = inject(SearchBarService);
  databaseService =inject(DatabaseService)
  authService = inject(AuthService)

  showOverlay = this.searchBarService.showOverlay;
  searches = this.searchBarService.searches;
  currentSearch = signal<string>('')
  queryDocs = signal<documentType[]>([])

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('s');
      if (search) {
        this.currentSearch.set(search)
        this.queryDocuments()
      }
    });
  }

  queryDocuments() {
    this.databaseService.getIndicizedDocuments(this.currentSearch()).subscribe(
      (docs) => {
        this.queryDocs.set(this.databaseService.documents().filter((doc) => docs.includes(doc)))
      }
    )
  }

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
