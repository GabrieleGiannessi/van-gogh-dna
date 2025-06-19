import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  documents = signal<string[]>(['/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf']);
  
}
