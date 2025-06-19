import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { SearchOverlayComponent } from "../search-overlay/search-overlay.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-search-bar',
  imports: [SearchOverlayComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  searchBarService = inject(SearchBarService)
  
  recentSearches = computed(() => this.searchBarService.recentSearches());
  showOverlay = model.required<boolean>();

  currentSearch = model<string>('');
  searchControl = new FormControl<string>('')

  constructor() { 
    effect(() => {
      this.searchControl.setValue(this.currentSearch(), { emitEvent: false });
    });
  }

}
