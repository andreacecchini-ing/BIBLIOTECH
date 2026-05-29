import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recensioni } from '../dto/recensioni.model';

@Injectable({
  providedIn: 'root'
})
export class RecensioniService {

  private apiUrl = 'http://localhost:8080/api/recensioni'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Recensioni[]> {
    return this.http.get<Recensioni[]>(this.apiUrl);
  }

  getById(id: number): Observable<Recensioni> {
    return this.http.get<Recensioni>(`${this.apiUrl}/${id}`);
  }

  getByIsbn(isbn: number): Observable<Recensioni[]> {
    return this.http.get<Recensioni[]>(`${this.apiUrl}/libro/${isbn}`);
  }

  create(entity: Recensioni): Observable<Recensioni> {
    return this.http.post<Recensioni>(this.apiUrl, entity);
  }

  update(id: number, entity: Recensioni): Observable<Recensioni> {
    return this.http.put<Recensioni>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getRecensioniUtente(): Observable<Recensioni[]> {
    return this.http.get<Recensioni[]>(`${this.apiUrl}/utente`);
  }
}