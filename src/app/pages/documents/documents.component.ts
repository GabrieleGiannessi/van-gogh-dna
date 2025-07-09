import { Component, computed, effect, inject, resource, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { DatabaseService, documentType } from '../../services/database.service';
import { firstValueFrom } from 'rxjs';
import { DocumentListComponent } from "../../components/document-list/document-list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { ToastsComponent } from "../../components/toasts/toasts.component";
import { LottieLogoComponent } from "../../components/lottie/lottie.component";

@Component({
  selector: 'app-documents',
  imports: [DocumentListComponent, ToastsComponent, LottieLogoComponent],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {

  authService = inject(AuthService)
  databaseService = inject(DatabaseService)

  toggleRefresh = signal<boolean>(false)
  sub = computed (() => this.authService.subject())

  userDocs = rxResource<documentType[], {refresh: boolean, sub: string}>({
    request: () => ({ refresh: this.toggleRefresh(), sub: this.sub() }),
    loader: ({request}) => {
      return this.databaseService.getDocsBySubject(request.sub)
    }
  })

  degub = effect(() => console.log(this.userDocs.value())
)


}
