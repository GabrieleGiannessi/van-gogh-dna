import { Component } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { ExamplePdfViewerComponent } from "../../components/example-pdf-viewer/example-pdf-viewer.component";
@Component({
  selector: 'app-home',
  imports: [CarouselComponent, ExamplePdfViewerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
