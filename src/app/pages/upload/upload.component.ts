import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  databaseService = inject(DatabaseService)
  authService = inject(AuthService)
  toastService = inject(ToastService)
  router = inject(Router)

  isDragOver = signal<boolean>(false)
  file = signal<File | null>(null)
  filename = computed(() => this.file() !== null ? this.file()!.name : null)
  isSelected = computed(() => this.filename() !== null)
  showSpinner = signal<boolean>(false)
  progress = signal<number>(0)

  form: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(5)]),
    author: new FormControl('', [Validators.required, Validators.minLength(5)])
  })

  @ViewChild('success') successTemplate!: TemplateRef<any>;
  @ViewChild('error') errorTemplate!: TemplateRef<any>;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(true)
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false)
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false)
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.file.set(file)
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.file.set(file)
    }
  }

  async onSubmit() {
  if (!this.form.valid || this.file() === null) {
    this.form.markAllAsTouched();
    return;
  }

  this.showSpinner.set(true);
  this.progress.set(0);

  const MIN_SPINNER_TIME = 800; // ms
  const start = Date.now();

  const { title, author } = this.form.getRawValue();

  this.databaseService.uploadDocument(this.file()!, {
    sub: this.authService.subject(),
    title,
    author
  }).subscribe({
    next: async (event) => {
      switch (event.type) {
        case HttpEventType.Sent:
          // Richiesta inviata, progress a 0
          this.progress.set(0);
          break;

        case HttpEventType.UploadProgress:
          if (event.total) {
            const percent = Math.round(100 * event.loaded / event.total);
            this.progress.set(percent);
          }
          break;

        case HttpEventType.Response:
          const elapsed = Date.now() - start;
          if (elapsed < MIN_SPINNER_TIME) {
            await new Promise(res => setTimeout(res, MIN_SPINNER_TIME - elapsed));
          }
          this.showSpinner.set(false);
          this.progress.set(100);
          this.toastService.show({
            template: this.successTemplate,
            classname: 'bg-success text-light',
            delay: 10000
          });
          this.router.navigateByUrl('/home');
          break;
      }
    },
    error: async (err) => {
      const elapsed = Date.now() - start;
      if (elapsed < MIN_SPINNER_TIME) {
        await new Promise(res => setTimeout(res, MIN_SPINNER_TIME - elapsed));
      }
      this.showSpinner.set(false);
      this.progress.set(0);
      this.toastService.show({
        template: this.errorTemplate,
        classname: 'bg-danger text-light',
        delay: 10000
      });
      console.error('Errore durante l\'upload:', err);
    }
  });
}



}
