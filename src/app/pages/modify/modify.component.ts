import { Component, computed, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-modify',
  imports: [ReactiveFormsModule],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss'
})
export class ModifyDocumentComponent {

  router = inject(ActivatedRoute)
  databaseService = inject(DatabaseService)

  doc = computed(() => {return this.databaseService.documents().find(doc => doc.doc_id === this.router.snapshot.params['id']) || null})

  form: FormGroup = new FormGroup({
    title: new FormControl(this.doc()?.title || ''), 
    author: new FormControl(this.doc()?.author || ''), 
  })

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  showSpinner() {
    return true
  }
}
