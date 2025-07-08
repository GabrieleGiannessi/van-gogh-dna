import { Component, effect, inject, input, model, Signal, signal, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, documentType } from '../../services/database.service';
import { DocumentCardComponent } from "../document-card/document-card.component";
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-document-list',
  imports: [DocumentCardComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  databaseService = inject(DatabaseService)
  toastService = inject(ToastService)

  @ViewChild('delete') deleteTemplate!: TemplateRef<any>;
  @ViewChild('error') errorTemplate!: TemplateRef<any>;

  docs = model.required<documentType[]>()
  toggleSpinner = signal<boolean>(false)

  debug = effect(() => console.log(this.docs()),)

  onDelete($id: string) {
    this.toggleSpinner.set(true)
    this.databaseService.deleteDocument($id).subscribe({
      next: () => {
        this.docs.update(docs => docs.filter((doc) => doc.doc_id !== $id))
        //mettere spinner e toast a fine operazione
        this.toggleSpinner.set(false)
        this.toastService.show({
          template: this.deleteTemplate, classname: 'bg-success text-light', delay: 10000
        })
      },
      error: (err) => {
        console.log(err)
        this.toggleSpinner.set(false)
        this.toastService.show({
          template: this.errorTemplate, classname: 'bg-danger text-light', delay: 10000
        })
      }
    })
  }
}
