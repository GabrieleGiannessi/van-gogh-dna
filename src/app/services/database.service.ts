import { HttpClient, HttpEvent } from '@angular/common/http';
import { computed, inject, Injectable, resource } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://127.0.0.1:8000'; // base URL dell'API FastAPI
  http = inject(HttpClient)
  authService = inject(AuthService)

  documents = toSignal(this.getDocs(), { initialValue: []})
  
  getDocs(): Observable<documentType[]>{
    return this.http.get<documentType[]>(`${this.apiUrl}/documents/`);
  } 

  getDocsBySubject(sub: string): Observable<documentType[]> {
    return this.http.get<documentType[]>(`${this.apiUrl}/documents/sub/${sub}`);
  }

  getDocsByQuery(query: string): Observable<documentType[]> {
    return this.http.get<documentType[]>(`${this.apiUrl}/search?q=${query}`);
  }

  downloadPdf(fileId: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${fileId}`, {
      responseType: 'blob'
    });
  }

  openPdfInNewTab(fileId: string) {
    const url = `${this.apiUrl}/download/${fileId}?download=false`;
    window.open(url, '_blank');
  }

  showPreviewFile(fileId: string) {
    this.http.get(`${this.apiUrl}/preview/${fileId}`)
  }

  getDocumentPages(fileId: string): Observable<pageType[]> {
    return this.http.get<pageType[]>(`${this.apiUrl}/documents/${fileId}/pages`)
  }

  uploadDocument(file: File, document: Partial<documentType>): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', file);

    if (document.title) {
      formData.append('title', document.title);
    }
    if (document.sub) {
      formData.append('sub', document.sub);
    }
    if (document.author) {
      formData.append('author', document.author);
    }

    return this.http.post<any>(`${this.apiUrl}/upload/`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteDocument(doc_id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/documents/${doc_id}`)
  }

}

export interface documentType {
  doc_id: string
  sub: string
  title: string
  filename: string
  author: string
  download_link: string
  pages: pageType[]
}

export interface pageType {
  doc_id: string
  page: number
  text: string
  metadata: DocMetadata
}

export interface DocMetadata {
  created_at: string
}