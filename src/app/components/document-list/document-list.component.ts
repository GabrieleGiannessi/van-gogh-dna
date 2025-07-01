import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService, documentType } from '../../services/database.service';
import { DocumentCardComponent } from "../document-card/document-card.component";

@Component({
  selector: 'app-document-list',
  imports: [DocumentCardComponent],
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.scss'
})
export class DocumentListComponent {

  route = inject(ActivatedRoute)
  databaseService = inject(DatabaseService)

  search = signal<string>('')
  docs = signal<documentType[]>([])

  constructor() {
    this.route.queryParamMap.subscribe(params => {
      const search = params.get('s');
      if (search){
        this.search.set(search)
        this.queryDocuments()
      } 
    });
  }

  queryDocuments(){
    this.databaseService.getIndicizedDocuments(this.search()).subscribe(
      (docs) => {
        this.docs.set(docs)
      }
    )
  }

  

  
}
