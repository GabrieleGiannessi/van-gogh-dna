import { Component, computed, inject, resource } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-documents',
  imports: [],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  authService = inject(AuthService)
  databaseService = inject(DatabaseService)

  userDocuments = computed(() => this.databaseService.documents().filter((doc) => doc.sub === this.authService.subject()))

  
}
