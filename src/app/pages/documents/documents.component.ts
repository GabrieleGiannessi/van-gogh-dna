import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { firstValueFrom } from 'rxjs';
import { DocumentListComponent } from "../../components/document-list/document-list.component";

@Component({
  selector: 'app-documents',
  imports: [DocumentListComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  authService = inject(AuthService)
  databaseService = inject(DatabaseService)

  userDocuments = signal(this.databaseService.documents().filter(
    doc => doc.sub === this.authService.subject()
  ));
}
