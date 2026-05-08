import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Libri } from '../../dto/libri.model'; 
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; 
import { UtentiService } from '../../service/utenti.service'; 

@Component({
  selector: 'app-ut-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ut-base.component.html',
  styleUrl: './ut-base.component.scss'
})

export class UtBaseComponent implements OnInit {
  listaLibri: Libri[] = []; 

  constructor(private router: Router, private libriService: LibriService, private utentiService: UtentiService) {}

  goToKart() {
    this.router.navigate(['/kart']); 
  }

  goToHome() {
    this.router.navigate(['/']); 
    const utente = null; 
    this.utentiService.setUtenteLoggato(utente);
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
  
  ngOnInit() {
    const utente = this.utentiService.getUtenteLoggato();

    if (utente) {
      console.log("Accesso confermato per:", utente.email);

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
      console.warn("Nessun utente loggato, reindirizzamento...");
      this.router.navigate(['/login']);
    }
  }
}