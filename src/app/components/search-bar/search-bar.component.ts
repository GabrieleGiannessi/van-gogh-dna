import { Component, effect, model, signal } from '@angular/core';
import { SearchOverlayComponent } from "../search-overlay/search-overlay.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [SearchOverlayComponent, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  showOverlay = model<boolean>(false);
  recentSearches = signal<string[]>([`"Angular,`, `"TypeScript"`, `"Web Development"`, `"Frontend Frameworks"`]);

  currentSearch = model<string>('');

  searchControl = new FormControl<string>('')

  constructor() { 
    effect(() => {
      this.searchControl.setValue(this.currentSearch(), { emitEvent: false });
    });
  }

}
