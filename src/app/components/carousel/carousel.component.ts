import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { NgbCarouselConfig, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SearchBarService } from '../../services/search-bar.service';

@Component({
  selector: 'app-carousel',
  imports: [NgbCarouselModule, SearchBarComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  providers: [NgbCarouselConfig],
})
export class CarouselComponent implements OnDestroy, OnInit {


  config = inject(NgbCarouselConfig);

  searchBarService = inject(SearchBarService);
  showOverlay = this.searchBarService.showOverlay;
  recentSearches = this.searchBarService.recentSearches;

  images = signal([
    'https://picsum.photos/id/10/1200/400',
    'https://picsum.photos/id/11/1200/400',
    'https://picsum.photos/id/12/1200/400',
    'https://picsum.photos/id/13/1200/400'
  ]);

  activeIndex = signal(0);
  private intervalId: any;

  constructor() {
    // Configurazione del carosello con signals
    this.config.interval = 3000;
    this.config.wrap = true;
    this.config.pauseOnHover = false;

    effect(() => {
      // Questo effetto si attiva quando activeIndex cambia
      const currentIndex = this.activeIndex();
      const totalImages = this.images().length;

      if (currentIndex >= totalImages) {
        this.activeIndex.set(0);
      }
    });
  }

  ngOnInit(): void {
    // Avvia il carosello automatico
    this.startAutoRotation();
  }

  startAutoRotation(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide(): void {
    this.activeIndex.update(current => (current + 1) % this.images().length);
  }

  prevSlide(): void {
    const length = this.images().length;
    this.activeIndex.update(current => (current - 1 + length) % length);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
