import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gestione } from '../dto/gestione.model';

@Injectable({
  providedIn: 'root'
})
export class GestioneService {

  private apiUrl = '/api/gestione'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Gestione[]> {
    return this.http.get<Gestione[]>(this.apiUrl);
  }

  getById(id: number): Observable<Gestione> {
    return this.http.get<Gestione>(`${this.apiUrl}/${id}`);
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
  */
  save(gestione: any) {
    return this.http.post('http://localhost:8080/api/gestioni', gestione);
  }
  /*
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