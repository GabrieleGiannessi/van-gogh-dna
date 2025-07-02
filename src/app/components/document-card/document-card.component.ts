import { Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { DatabaseService, documentType } from '../../services/database.service';
@Component({
  selector: 'app-document-card',
  imports: [],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent implements OnInit {

  document = input.required<documentType>()
  databaseService = inject(DatabaseService)
  pages = signal<number[]>([])
  
  ngOnInit(){
    this.getPages()
  }

  download() {
    this.databaseService.downloadPdf(this.document().doc_id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = this.document().title;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  showPdf() {
    this.databaseService.openPdfInNewTab(this.document().doc_id)
  }

  showPreview() {
    this.databaseService.showPreviewFile(this.document().doc_id)
  }

  onImgError($event: Event) {
    ($event.target as HTMLImageElement).src = 'assets/images/placeholder.webp';
  }

  getPages(){
    this.databaseService.getDocumentPages(this.document().doc_id).subscribe(pages => {
      this.pages.set(pages.map((p: { page: number }) => p.page));
    });
  }

}
