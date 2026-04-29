import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libri } from '../dto/libri.model'; // Importa il modello appena creato

@Injectable({
  providedIn: 'root'
})
export class LibriService {

  // Deve corrispondere all'URL definito nel Controller Java (@RequestMapping)
  private apiUrl = '/api/libri'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Libri[]> {
    return this.http.get<Libri[]>(this.apiUrl);
  }

  getById(id: number): Observable<Libri> {
    return this.http.get<Libri>(`${this.apiUrl}/${id}`);
  }

  create(entity: Libri): Observable<Libri> {
    return this.http.post<Libri>(this.apiUrl, entity);
  }

  update(id: number, entity: Libri): Observable<Libri> {
    return this.http.put<Libri>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}