export interface Prenotazione {
  isbn?: string|number;
  idBiblioteca: string;
  username: string;
  dataPrenotazione: Date|string;
  dataRestituzionePrevista: Date|string;
  dataRestituzioneEffettiva?: Date|string;
}