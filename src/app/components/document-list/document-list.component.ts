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

  docs = input.required<documentType[]>()

}
