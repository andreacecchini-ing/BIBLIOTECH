export interface Utenti {
  id?: number;
  username: string;
  nome: string;
  cognome: string;
  email: string;
  cellulare: string;
  indirizzo: string;
  data_nascita: string;
  password?: string;
}