import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utenti } from '../../dto/utenti.model';
import { UtentiService } from '../../service/utenti.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-page.component.html',
  styleUrl: './access-page.component.scss'
})
export class AccessPageComponent {
  mode: 'login' | 'register'| 'register2' | 'register3' = 'login'; 

  constructor(private router: Router, private utentiService: UtentiService) {}

  listaUtenti: Utenti[] = [];
  isBibliotecario: boolean = false;

  goToHome() {
    this.router.navigate(['/']); 
  }
  goToUtBase(){
    this.router.navigate(['/ut-base']);
  }
  ngOnInit(): void {
    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
    });
  }

  nuovoUtente = {
  nome: '',
  cognome: '', 
  username: '', 
  email: '',
  password: '',
  cellulare: '', 
  indirizzo: '', 
  data_nascita: '', 
  biblioteca: ''
  };

  utenteLoggato: Utenti | null = null;
  
  registrati() {
    this.utentiService.save(this.nuovoUtente).subscribe({
      next: (res:any) => {
        alert('Utente registrato con successo! Ora puoi effettuare il login.');
        this.mode = 'login';
      },
      error: (err:any) => {
        alert('Errore nella registrazione. L\'email potrebbe essere già presente.');
      }
    });
  }

  accedi() {
    console.log("Dati inviati:", this.nuovoUtente);

    this.utentiService.login(this.nuovoUtente).subscribe({
      next: (utenteDalDB: any) => {
        alert('L\'utente ha effettuato l\'accesso con successo!');
        this.utenteLoggato = utenteDalDB; 
        this.utentiService.setUtenteLoggato(utenteDalDB);
        this.goToUtBase();
      },
      error: (err:any) => {
        alert('Errore nell\'accesso. Email o password errati.');
      }
    });
  }
}