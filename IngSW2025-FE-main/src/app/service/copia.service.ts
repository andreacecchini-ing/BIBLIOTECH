import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CopieLibri } from '../dto/copie-libri.model';

@Injectable({
  providedIn: 'root'
})
export class CopiaService {

  private apiUrl = '/api/copie'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<CopieLibri[]> {
    return this.http.get<CopieLibri[]>(this.apiUrl);
  }

  getById(id: number): Observable<CopieLibri> {
    return this.http.get<CopieLibri>(`${this.apiUrl}/${id}`);
  }

  disponibile(isbn: string, id_biblioteca: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/disponibile?isbn=${isbn}&id_biblioteca=${id_biblioteca}`);
  }
/*
  create(entity: Utenti): Observable<Utenti> {
    return this.http.post<Utenti>(this.apiUrl, entity);
  }

  update(id: number, entity: Utenti): Observable<Utenti> {
    return this.http.put<Utenti>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  save(utente: any) {
    return this.http.post('http://localhost:8080/api/utenti', utente);
  }
  login(credenziali: any): Observable<any> { 
    return this.http.post('http://localhost:8080/api/utenti/login', credenziali);
  }
  
  private utenteSessione: any = null;

  setUtenteLoggato(utente: any) {
    this.utenteSessione = utente;
    console.log("Utente salvato in sessione:", this.utenteSessione);
  }

  getUtenteLoggato() {
    return this.utenteSessione;
  }
    */
}