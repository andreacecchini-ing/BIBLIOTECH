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
  mode: 'login' | 'register'| 'register2' | 'register3' = 'login'; // Imposta il login come default

  constructor(private router: Router, private utentiService: UtentiService) {}

  listaUtenti: Utenti[] = [];
  isBibliotecario: boolean = false;

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
  data_nascita: '', // Aggiunto
  biblioteca: '' // Aggiunto per il codice identificativo del bibliotecario
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
    console.log("Dati inviati:", this.nuovoUtente);
  // Chiamiamo il backend invece di controllare la lista locale
    this.utentiService.login(this.nuovoUtente).subscribe({
      next: (utenteDalDB: any) => {
        alert('L\'utente ha effettuato l\'accesso con successo!');
        this.utenteLoggato = utenteDalDB; // Salva l'utente con il suo ID reale
        this.utentiService.setUtenteLoggato(utenteDalDB); // Salva l'utente nel servizio
        this.goToUtBase();
      },
      error: (err:any) => {
        alert('Errore nell\'accesso. Email o password errati.');
      }
    });
  }
}