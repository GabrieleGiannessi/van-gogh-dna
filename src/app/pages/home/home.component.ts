import { Component, HostListener, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchBarService } from '../../services/search-bar.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-home',
  imports: [DocumentListComponent, FooterComponent, NavbarComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  route = inject(ActivatedRoute);
  searchBarService = inject(SearchBarService);
  authService = inject(AuthService)

  showOverlay = this.searchBarService.showOverlay;
  recentSearches = this.searchBarService.recentSearches;

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
