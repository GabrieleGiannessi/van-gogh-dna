import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://127.0.0.1:8000'; // base URL dell'API FastAPI

  constructor(private http: HttpClient) { }

  getIndicizedDocuments(query: string): Observable<documentType[]> {
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

  showPreviewFile (fileId: string){ 
    this.http.get(`${this.apiUrl}/preview/${fileId}`)
  }

  getDocumentPages(fileId: string): Observable<pageType[]>{
    return this.http.get<pageType[]>(`${this.apiUrl}/documents/${fileId}`)
  }

}

export interface documentType {
  doc_id: string
  title: string
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