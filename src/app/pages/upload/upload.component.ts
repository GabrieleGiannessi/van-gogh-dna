import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-upload',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  databaseService = inject(DatabaseService)
  authService = inject(AuthService)

  isDragOver = signal<boolean>(false)
  file = signal<File | null>(null)
  filename = computed(() => this.file() !== null ? this.file()!.name : null)
  isSelected = computed (() => this.filename() !== null)
  showSpinner = signal<boolean>(false)

  form : FormGroup = new FormGroup({
    title: new FormControl ('', [Validators.required, Validators.minLength(5)]),
    author: new FormControl ('', [Validators.required, Validators.minLength(5)])
  })

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
        console.log('Upload riuscito:', response);
        // this.successMessage.set('File caricato con successo. Indicizzazione in corso.');
      },
      error: async (err) => {
        const elapsed = Date.now() - start;
        if (elapsed < MIN_SPINNER_TIME) {
          await new Promise(res => setTimeout(res, MIN_SPINNER_TIME - elapsed));
        }
        this.showSpinner.set(false);
        console.error('Errore durante l\'upload:', err);
        // this.errorMessage.set('Errore durante il caricamento del file.');
      }
    });
  }


}
