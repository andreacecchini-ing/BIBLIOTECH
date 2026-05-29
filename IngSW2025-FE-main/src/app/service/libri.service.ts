import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libri } from '../dto/libri.model';

@Injectable({
  providedIn: 'root'
})
export class LibriService {

  private apiUrl = '/api/libri'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Libri[]> {
    return this.http.get<Libri[]>(this.apiUrl);
  }

  getByIsbn(ISBN: string): Observable<Libri> {
    return this.http.get<Libri>(`${this.apiUrl}/${ISBN}`);
  }

  create(entity: Libri): Observable<Libri> {
    return this.http.post<Libri>(this.apiUrl, entity);
  }

  update(ISBN: string, entity: Libri): Observable<Libri> {
    return this.http.put<Libri>(`${this.apiUrl}/${ISBN}`, entity);
  }

  delete(ISBN: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ISBN}`);
  }
  getPrenotazioniUtente(): Observable<Libri[]> {
    return this.http.get<Libri[]>(`${this.apiUrl}/prenotazioni`);
  }
}