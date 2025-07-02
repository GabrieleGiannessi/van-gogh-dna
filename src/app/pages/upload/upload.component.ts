import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-upload',
  imports: [CommonModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  isDragOver = signal<boolean>(false)
  filename = signal<string | null>(null)
  isSelected = computed (() => this.filename() !== null)

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
      this.handleFile(file);
      event.dataTransfer.clearData();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    // Logica di gestione file (es. upload)
    this.filename.set(file.name)
  }

}
