import { Component, effect, inject, signal } from '@angular/core';
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

  router = inject(Router)
  route = inject(ActivatedRoute)
  databaseService = inject(DatabaseService)
  authService = inject(AuthService)

  search = signal<string>('')
  docs = signal<documentType[]>([])

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('s');
      if (search) {
        this.search.set(search)
        this.queryDocuments()
      }
    });
  }

  queryDocuments() {
    this.databaseService.getIndicizedDocuments(this.search()).subscribe(
      (docs) => {
        this.docs.set(docs)
      }
    )
  }




}
