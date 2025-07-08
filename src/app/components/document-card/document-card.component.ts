import { Component, inject, input, OnInit, output, signal, TemplateRef, ViewChild } from '@angular/core';
import { DatabaseService, documentType } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-document-card',
  imports: [NgbDropdownModule],
  templateUrl: './document-card.component.html',
  styleUrl: './document-card.component.scss'
})
export class DocumentCardComponent {

  authService = inject(AuthService)
  databaseService = inject(DatabaseService)
  toastService = inject(ToastService)

  document = input.required<documentType>()
  deleted = output<string>()

  // pages = signal<number[]>([])
  
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

  // getPages() {
  //   this.databaseService.getDocumentPages(this.document().doc_id).subscribe(pages => {
  //     this.pages.set(pages.map((p: { page: number }) => p.page));
  //   });
  // }

  deleteDoc() {
    this.deleted.emit(this.document().doc_id)
  }

}
