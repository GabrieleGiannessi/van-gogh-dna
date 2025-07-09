import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-modify',
  imports: [ReactiveFormsModule],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss'
})
export class ModifyDocumentComponent {

  router = inject(Router)
  databaseService = inject(DatabaseService)

  form: FormGroup = new FormGroup({
    title: new FormControl()
  })

  onSubmit() {
    throw new Error('Method not implemented.');
  }

  showSpinner() {
    return true
  }
}
