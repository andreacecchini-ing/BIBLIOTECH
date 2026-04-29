export interface Utenti {
  id?: number; // Il punto di domanda indica che è opzionale (lo genera il DB)
  username: string;
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  indirizzo: string;
  data_nascita: string;
  password?: string;
}