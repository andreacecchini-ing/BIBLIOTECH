import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utenti } from '../../dto/utenti.model';
import { UtentiService } from '../../service/utenti.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Biblioteche } from '../../dto/biblioteche.model';
import { BibliotecheService } from '../../service/biblioteche.service';
import { Gestione } from '../../dto/gestione.model';
import { GestioneService } from '../../service/gestione.service';

@Component({
  selector: 'app-access-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './access-page.component.html',
  styleUrl: './access-page.component.scss'
})
export class AccessPageComponent {
  mode: 'login' | 'register'| 'register2' | 'register3' = 'login'; 

  constructor(
    private router: Router,
    private utentiService: UtentiService, 
    private bibliotecheService: BibliotecheService, 
    private gestioneService: GestioneService,
    private route: ActivatedRoute
  ){}

  listaUtenti: Utenti[] = [];
  isBibliotecario: boolean = false;
  listaBiblioteche: Biblioteche[] = [];

  goToHome() {
    this.router.navigate(['/']); 
  }
  goToUtBase(){
    this.router.navigate(['/ut-base']);
  }
  goToBibliotecario(){
    this.router.navigate(['/bibliotecario']);
  }
  ngOnInit(): void {

    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
    });
    this.bibliotecheService.getAll().subscribe(data => {
      this.listaBiblioteche = data;
    });
    
    const registerParam = this.route.snapshot.queryParamMap.get('register');
    //console.log("Valore del parametro 'register':", registerParam);
    if (registerParam === 'true') {
        this.mode = 'register';
    } else {
      this.mode = 'login';
    }
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
  ruolo: ''
  };

  codiceBiblioteca: string = '';

  utenteLoggato: Utenti | null = null;
  
  /*registrati() {
    if(this.codiceBiblioteca === ){
      
    }
    this.utentiService.save(this.nuovoUtente).subscribe({
        next: (res:any) => {
          alert('Utente registrato con successo! Ora puoi effettuare il login.');
          this.mode = 'login';
        },
        error: (err:any) => {
          alert('Errore nella registrazione. L\'email potrebbe essere già presente.');
        }
      });
    
  }*/
  registrati() {
    console.log("Stato isBibliotecario:", this.isBibliotecario);
    console.log("Codice inserito:", this.codiceBiblioteca);
    console.log("Contenuto attuale di listaBiblioteche:", this.listaBiblioteche);
    
    const bibliotecaTrovate = this.listaBiblioteche.find(
      b => String(b.id_biblioteca) === String(this.codiceBiblioteca)
    );
    
    console.log("Biblioteca trovata:", bibliotecaTrovate);
    

    const bibliotecaTrovata = this.listaBiblioteche.find(
      b => String(b.id_biblioteca) === String(this.codiceBiblioteca)
    );

    console.log("Biblioteca trovata:", bibliotecaTrovata);

    if (this.isBibliotecario && !bibliotecaTrovata) {
      alert('Errore: Codice biblioteca non trovato o non valido!');
      return;
    }

    const payload = {
      ...this.nuovoUtente,
      ruolo: this.isBibliotecario ? 'BIBLIOTECARIO' : 'UTENTE'
    };

    this.utentiService.save(payload).subscribe({
      next: (res: any) => {
        if (this.isBibliotecario && bibliotecaTrovata) {
          this.gestioneService.save({
            username: res.username,
            id_biblioteca: bibliotecaTrovata.id_biblioteca
          }).subscribe({
            next: () => alert('Registrato come Bibliotecario con successo!'),
            error: (err) => alert('Errore nel salvataggio gestione: ' + err.message)
          });
        } else {
          alert('Registrazione completata come Utente!');
        }
        this.mode = 'login';
      },
      error: (err: any) => {
        if (err.status === 409) {
        alert('Attenzione: questa email è già registrata. Prova ad accedere o usa un altro indirizzo.');
        } else {
        alert('Errore durante la registrazione: ' + err.message);
        }
      }
    });
  }

  accedi() {
    console.log("Dati inviati:", this.nuovoUtente);

    this.utentiService.login(this.nuovoUtente).subscribe({
      next: (utenteDalDB: any) => {
        alert('L\'utente ha effettuato l\'accesso con successo!');
        if(utenteDalDB.ruolo === 'BIBLIOTECARIO') {
          this.goToBibliotecario();
        }else {
          this.goToUtBase();
        }
        this.utenteLoggato = utenteDalDB; 
        this.utentiService.setUtenteLoggato(utenteDalDB);
      },
      error: (err:any) => {
        alert('Errore nell\'accesso. Email o password errati.');
      }
    });
  }
}