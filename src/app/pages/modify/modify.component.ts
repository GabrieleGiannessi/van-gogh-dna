import { Component, computed, effect, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService, documentType } from '../../services/database.service';
import { ToastService } from '../../services/toast.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-modify',
  imports: [ReactiveFormsModule],
  templateUrl: './modify.component.html',
  styleUrl: './modify.component.scss'
})
export class ModifyDocumentComponent {

  route = inject(ActivatedRoute)
  router = inject(Router)
  databaseService = inject(DatabaseService)
  toastService = inject(ToastService)

  showSpinner = signal<boolean>(false)
  doc = rxResource<documentType, string>({
    request: () => (this.route.snapshot.params['id']),
    loader: ({ request }) => { return this.databaseService.getDocByID(request) }
  })

  document = computed(() => this.doc.value())

  // doc = computed(() => { return this.databaseService.documents().find(doc => doc.doc_id === this.route.snapshot.params['id']) || null })

  form: FormGroup = new FormGroup({
    title: new FormControl('', []),
    author: new FormControl('', []),
  })

  @ViewChild('success') successTemplate!: TemplateRef<any>;
  @ViewChild('error') errorTemplate!: TemplateRef<any>;

  constructor() {
    this.form.disable()
    effect(() => {
      if (this.document()) {
        this.form.patchValue({
          title: this.document()!.title,
          author: this.document()!.author
        })
        this.form.enable()
      }
    })
  }

  onSubmit() {
    if (!this.form.valid) {
      this.form.reset()
      this.toastService.show({
        template: this.errorTemplate,
        classname: 'bg-danger text-light',
        delay: 10000
      })
      return
    }

    const { title, author } = this.form.getRawValue()
    this.form.reset()
    this.showSpinner.set(true)
    this.databaseService.updateDocument(this.document()!.doc_id, {
      title: title,
      author: author
    }).subscribe({
      next: () => {
        this.showSpinner.set(false)
        this.toastService.show({
          template: this.successTemplate,
          classname: 'bg-success text-light',
          delay: 10000
        })
        this.router.navigateByUrl('/home')
      },

      error: (e) => {
        console.error(e)
        this.showSpinner.set(false)
        this.toastService.show({
          template: this.errorTemplate,
          classname: 'bg-danger text-light',
          delay: 10000
        })
      }
    })
  }


}
