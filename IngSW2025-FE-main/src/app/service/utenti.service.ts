import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utenti } from '../dto/utenti.model'; // Importa il modello appena creato

@Injectable({
  providedIn: 'root'
})
export class UtentiService {

  // Deve corrispondere all'URL definito nel Controller Java (@RequestMapping)
  private apiUrl = '/api/utenti'; 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Utenti[]> {
    return this.http.get<Utenti[]>(this.apiUrl);
  }

  getById(id: number): Observable<Utenti> {
    return this.http.get<Utenti>(`${this.apiUrl}/${id}`);
  }

  create(entity: Utenti): Observable<Utenti> {
    return this.http.post<Utenti>(this.apiUrl, entity);
  }

  update(id: number, entity: Utenti): Observable<Utenti> {
    return this.http.put<Utenti>(`${this.apiUrl}/${id}`, entity);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  save(utente: any) {//tentativo di fare il save per la registrazione, non riesco a farlo funzionare
  // DEVE esserci il return davanti a this.http
    return this.http.post('http://localhost:8080/api/utenti', utente);
  }
  // utenti.service.ts
  login(credenziali: any): Observable<any> { // Aggiungi : Observable<any>
    return this.http.post('http://localhost:8080/api/utenti/login', credenziali);
  }
  
  // Questa variabile conterrà l'utente con il suo ID reale del DB
  private utenteSessione: any = null;

  setUtenteLoggato(utente: any) {
    this.utenteSessione = utente;
    console.log("Utente salvato in sessione:", this.utenteSessione);
  }

  getUtenteLoggato() {
    return this.utenteSessione;
  }
}