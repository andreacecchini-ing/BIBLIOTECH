import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule per ngModel (tentativo non concluso perché non riesco a farlo funzionare)
import { Utenti } from '../../dto/utenti.model'; // Assicurati che il percorso sia giusto
import { UtentiService } from '../../service/utenti.service';
import { Router } from '@angular/router'; // Importa il Router //la uso per passare la possibilità di accesso

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [CommonModule, FormsModule],//FormsModule non funziona e al momento non implementa nulla
  templateUrl: './access-page.component.html',
  styleUrl: './access-page.component.scss'
})
export class AccessPageComponent {
  mode: 'login' | 'register' = 'login'; // Imposta il login come default

  constructor(private router: Router, private utentiService: UtentiService) {}

  listaUtenti: Utenti[] = [];
  
  goToHome() {
    this.router.navigate(['/']); // Naviga verso la rotta 'home'
  }
  goToUtBase(){
    this.router.navigate(['/ut-base']); // Naviga verso la rotta 'ut-base'
  }
  ngOnInit(): void {
    // Carica i dati dal backend
    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
    });
  }

  // Oggetto per raccogliere i dati dal form
  nuovoUtente = {
  nome: '',
  cognome: '',  // Aggiunto
  username: '', // Aggiunto
  email: '',
  password: '',
  cellulare: '', // Aggiunto
  indirizzo: '', // Aggiunto
  data_nascita: '' // Aggiunto
  };

  utenteLoggato: Utenti | null = null; // Variabile per memorizzare l'utente loggato
  
  // Metodo per inviare i dati al backend
  registrati() {
    this.utentiService.save(this.nuovoUtente).subscribe({
      next: (res:any) => {
        alert('Utente registrato con successo! Ora puoi effettuare il login.');
        this.mode = 'login'; // Torna al login dopo il successo
      },
      error: (err:any) => {
        alert('Errore nella registrazione. L\'email potrebbe essere già presente.');
      }
    });
  }
  // Metodo per inviare i dati al backend
  accedi() {
    if(!this.listaUtenti.some(utente => utente.email === this.nuovoUtente.email && utente.password === this.nuovoUtente.password)) {
      alert('Errore nell\'accesso. L\'email o la password potrebbero essere errati.');//L'utente non esiste o la password è errata
      return;
    }else {
        alert('L\'utente ha effettuato l\'accesso con successo!');
        this.utenteLoggato = this.nuovoUtente; // Memorizza l'utente loggato
        this.goToUtBase(); // Vai alla pagina principale dell'utente dopo il successo
    }
  }
}