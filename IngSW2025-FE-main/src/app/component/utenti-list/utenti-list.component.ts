import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtentiService } from '../../service/utenti.service';
import { Utenti } from '../../dto/utenti.model';

@Component({
  selector: 'app-utenti-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './utenti-list.component.html',
  styleUrl: './utenti-list.component.scss'
})
export class UtentiListComponent implements OnInit {
  listaUtenti: Utenti[] = []; 

  constructor(private utentiService: UtentiService) {} 

  ngOnInit(): void {
    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
      console.log('Dati ricevuti:', data); 
    });
  }

  elimina(id: any): void {
    if(confirm("Sei sicuro di voler eliminare questo utente?")) {
      this.utentiService.delete(id).subscribe(() => {
        this.ngOnInit(); 
      });
    }
  }

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