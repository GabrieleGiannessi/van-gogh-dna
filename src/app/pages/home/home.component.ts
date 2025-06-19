import { Component, inject } from '@angular/core';
import { SearchBarComponent } from "../../components/search-bar/search-bar.component";
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { ExamplePdfViewerComponent } from "../../components/example-pdf-viewer/example-pdf-viewer.component";
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { ActivatedRoute } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";
@Component({
  selector: 'app-home',
  imports: [CarouselComponent, DocumentListComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  route = inject(ActivatedRoute);

  get hasSParam(): boolean {
    return this.route.snapshot.queryParamMap.has('s');
  }
}
