import { Component, effect, inject, input, model, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, documentType } from '../../services/database.service';
import { DocumentCardComponent } from "../document-card/document-card.component";
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-document-list',
  imports: [DocumentCardComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  databaseService = inject (DatabaseService)

  docs = model.required<documentType[]>()
  toggleSpinner = signal<boolean> (false)

  onDelete($id: string){
    this.toggleSpinner.set(true)
    this.databaseService.deleteDocument($id).subscribe({
      next: () => {
        this.docs.update(docs => docs.filter((doc) => doc.doc_id !== $id))
        //mettere spinner e toast a fine operazione
        this.toggleSpinner.set(false)
      },
      error: (err) => {
        console.log(err)
        //mettere spinner e toast a fine operazione
        this.toggleSpinner.set(false)
      }
    })
  }
}
