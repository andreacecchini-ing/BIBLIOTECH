import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Serve per usare *ngFor nell'HTML
import { UtentiService } from '../../service/utenti.service';
import { Utenti } from '../../dto/utenti.model';

@Component({
  selector: 'app-utenti-list',
  standalone: true,
  imports: [CommonModule], // Fondamentale per vedere la lista
  templateUrl: './utenti-list.component.html',
  styleUrl: './utenti-list.component.scss'
})
export class UtentiListComponent implements OnInit {
  listaUtenti: Utenti[] = []; // Qui verranno salvati i dati

  constructor(private utentiService: UtentiService) {} // Inietto il service

  ngOnInit(): void {
    // Chiamo il backend appena la pagina è pronta
    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
      console.log('Dati ricevuti:', data); // Utile per controllare in console (F12)
    });
  }
  // Funzione per eliminare
  elimina(id: any): void {
    if(confirm("Sei sicuro di voler eliminare questo utente?")) {
      this.utentiService.delete(id).subscribe(() => {
        // Ricarica la lista dopo l'eliminazione per "pulire" la tabella
        this.ngOnInit(); 
      });
    }
  }
  // Funzione per aggiungere (esempio semplice)
  aggiungiNuovo(): void {
    const nome = prompt("Nome:");
    const cognome = prompt("Cognome:");
    const email = prompt("Email:");
    const username = prompt("Username:");
    const password = prompt("Password:");
    if (nome && cognome && email && username && password) {
      const nuovo = { nome, cognome, email, username, password } as Utenti;
      this.utentiService.create(nuovo).subscribe(() => {
        this.ngOnInit();
      });
    }
  }
}