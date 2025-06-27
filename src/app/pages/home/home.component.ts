import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { ExamplePdfViewerComponent } from "../../components/example-pdf-viewer/example-pdf-viewer.component";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { SearchBarService } from '../../services/search-bar.service';
@Component({
  selector: 'app-home',
  imports: [DocumentListComponent, FooterComponent, NavbarComponent, SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  searchBarService = inject(SearchBarService);

  showOverlay = this.searchBarService.showOverlay;
  recentSearches = this.searchBarService.recentSearches;
  isLogged = computed(() => this.authService.currAccessToken() !== null)
  userClaims = computed(() => { 
    if (this.authService.currAccessToken() !== null) return this.authService.name 
    else null
  })

  constructor(){ 
    effect(() => console.log(this.userClaims()))
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const searchBarElement = document.querySelector('app-search-bar');
    if (!searchBarElement?.contains(event.target as Node)) {
      this.showOverlay.set(false);
    }
  }
  get hasSParam(): boolean {
    return this.route.snapshot.queryParamMap.has('s');
  }
}
