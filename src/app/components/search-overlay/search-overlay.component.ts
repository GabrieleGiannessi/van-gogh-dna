import { Component, model } from '@angular/core';

@Component({
  selector: 'app-search-overlay',
  imports: [],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  search = model.required<string>();
  overlay = model.required<boolean>();
  currentSearch = model.required<string>();

  handleClick() {
    this.overlay.set(false);
    this.currentSearch.set(this.search())
  }
}
