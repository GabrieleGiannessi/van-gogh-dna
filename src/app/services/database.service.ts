import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private apiUrl = 'http://127.0.0.1:8000'; // base URL dell'API FastAPI

  constructor(private http: HttpClient) { }

  getIndicizedDocuments(query: string): Observable<documentType[]> {
    return this.http.get<documentType[]>(`${this.apiUrl}/search?q=${query}`);
  }

  registerUser(email: string, password: string, username: string): Observable<UserInterface> {
    return this.http.post<UserInterface>(`${this.apiUrl}/users`, { email, password, username });
  }
}

export interface documentType {
  filename: string;
  path: string
  text: string;
}