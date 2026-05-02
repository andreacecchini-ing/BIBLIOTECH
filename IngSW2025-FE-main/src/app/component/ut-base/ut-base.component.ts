import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Serve per usare *ngFor nell'HTML
import { Libri } from '../../dto/libri.model'; // Assicurati che il percorso sia giusto
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; // Importa il Router //la uso per passare la possibilità di accesso
import { UtentiService } from '../../service/utenti.service'; // Importa il servizio utenti per gestire la sessione

@Component({
  selector: 'app-ut-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ut-base.component.html',
  styleUrl: './ut-base.component.scss'
})

export class UtBaseComponent implements OnInit {
  // QUESTA È LA RIGA MANCANTE:
  listaLibri: Libri[] = []; 

  constructor(private router: Router, private libriService: LibriService, private utentiService: UtentiService) {}

  goToKart() {
    this.router.navigate(['/kart']); // Naviga verso la rotta 'kart'
  }

  goToHome() {
    this.router.navigate(['/']); // Naviga verso la rotta 'home'
    const utente = null; //Effettua il logout cancellando l'utente dalla sessione
    this.utentiService.setUtenteLoggato(utente);
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]); // Naviga verso la rotta 'details' con l'id del libro
  }
  
  ngOnInit() {
  // 1. Recuperiamo l'utente dal service
    const utente = this.utentiService.getUtenteLoggato();

    if (utente) {
      console.log("Accesso confermato per:", utente.email);

      // 2. Se l'utente esiste, ALLORA carichiamo i libri
      this.libriService.getAll().subscribe({
        next: (data) => {
          this.listaLibri = data;
          console.log("Libri caricati con successo");
        },
        error: (err) => {
          console.error("Errore nel caricamento libri:", err);
        }
      });
    }else{
      // 3. Se non c'è nessuno loggato, rimandalo al login
      console.warn("Nessun utente loggato, reindirizzamento...");
      this.router.navigate(['/login']);
    }
  }
}