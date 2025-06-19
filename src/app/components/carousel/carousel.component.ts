import { Component, inject } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-carousel',
  imports: [NgbCarouselModule, SearchBarComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {

    searchBarService = inject(SearchBarService);
    showOverlay = this.searchBarService.showOverlay;
}
