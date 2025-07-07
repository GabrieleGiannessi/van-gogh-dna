import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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

  isDragOver = signal<boolean>(false)
  file = signal<File | null>(null)
  filename = computed(() => this.file() !== null ? this.file()!.name : null)
  isSelected = computed (() => this.filename() !== null)
  showSpinner = signal<boolean>(false)

  form : FormGroup = new FormGroup({
    title: new FormControl ('', [Validators.required, Validators.minLength(5)]),
    author: new FormControl ('', [Validators.required, Validators.minLength(5)])
  })

  @ViewChild('success') successTemplate!: TemplateRef<any>;
  @ViewChild('error') errorTemplate!: TemplateRef<any>;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Opzionale: aggiungi una classe per evidenziare il dropzone
    this.isDragOver.set(true)
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    // Opzionale: rimuovi la classe di evidenziazione
    this.isDragOver.set(false)
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver.set(false)
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      // Gestisci il file come preferisci (es. chiamata a un servizio di upload)
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

    const MIN_SPINNER_TIME = 800; // ms
    const start = Date.now();

    const { title, author } = this.form.getRawValue();
    this.databaseService.uploadDocument(this.file()!, {
      sub: this.authService.subject(),
      title,
      author
    }).subscribe({
      next: async (response) => {
        const elapsed = Date.now() - start;
        if (elapsed < MIN_SPINNER_TIME) {
          await new Promise(res => setTimeout(res, MIN_SPINNER_TIME - elapsed));
        }
        this.showSpinner.set(false);
        // console.log('Upload riuscito:', response);
        // this.successMessage.set('File caricato con successo. Indicizzazione in corso.');
        // Supponendo che tu abbia un TemplateRef chiamato 'successTemplate' nel tuo componente:
        // Torna indietro prima
        // Mostra il toast dopo un breve delay per assicurarsi che la navigazione sia avvenuta
          this.toastService.show({ template: this.successTemplate, classname: 'bg-success text-light', delay: 10000 });
      },
      error: async (err) => {
        const elapsed = Date.now() - start;
        if (elapsed < MIN_SPINNER_TIME) {
          await new Promise(res => setTimeout(res, MIN_SPINNER_TIME - elapsed));
        }
        this.showSpinner.set(false);
        console.error('Errore durante l\'upload:', err);
        this.toastService.show({ template: this.successTemplate, classname: 'bg-success text-light', delay: 10000 });
      }
    });
  }


}
