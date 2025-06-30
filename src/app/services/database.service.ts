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
  
}

export interface documentType {
  filename: string;
  path: string
  text: string;
}