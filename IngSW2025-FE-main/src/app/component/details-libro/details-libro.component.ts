import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { RecensioniService } from '../../service/recensioni.service';
import { Utenti } from '../../dto/utenti.model';
import { UtentiService } from '../../service/utenti.service';
import { Biblioteche } from '../../dto/biblioteche.model';
import { BibliotecheService } from '../../service/biblioteche.service';
import { Prenotazione } from '../../dto/prenotazioni.model';
import { PrenotazioniService } from '../../service/prenotazioni.service';
import { FormsModule } from '@angular/forms';
import { CopieLibri } from '../../dto/copie-libri.model';
import { CopiaService } from '../../service/copia.service';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-details-libro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './details-libro.component.html',
  styleUrl: './details-libro.component.scss'
})
export class DetailsLibroComponent implements OnInit {
  libro?: Libri;
  isbnLibro!: string | number;
  recensioni: any[] = [];
  listaBiblioteche: Biblioteche[] = [];
  bibliotecaSelezionata: string | number | null = null; // Memorizza l'ID della biblioteca
  
  ruoloUtente: 'ospite' | 'utente' | 'bibliotecario' = 'ospite';
  verificaAccesso(){
    const utente = this.utentiService.getUtenteLoggato();
    if(utente){
      this.ruoloUtente = 'utente';
      console.log("Accesso confermato per:", utente.email);
    }else{
      console.warn("Nessun utente loggato!");
    }
  }
  menuAperto: boolean = false;
  toggleMenu(): void {
    this.verificaAccesso();
    this.menuAperto = !this.menuAperto;
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/login'], { queryParams: { register: 'true' } });
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private libriService: LibriService,
    private recensioniService: RecensioniService,
    private utentiService: UtentiService,
    private bibliotecheService: BibliotecheService,
    private prenotazioniService: PrenotazioniService,
    private copiaService: CopiaService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    
    if (idParam) {
      this.isbnLibro = String(idParam);
      this.caricaDettagliLibro(this.isbnLibro);
      this.caricaRecensioniLibro(this.isbnLibro);
    } else {
      this.router.navigate(['/home']);
    }

    this.utentiService.getAll().subscribe(data => {
      this.listaUtenti = data;
    });

    this.bibliotecheService.getAll().subscribe(data => {
      this.listaBiblioteche = data;
    });

    const utente = this.utentiService.getUtenteLoggato();
    if (utente) {
      console.log("Accesso confermato per:", utente.email);
    }else{
      console.warn("Nessun utente loggato!");
    }

  }

  caricaDettagliLibro(isbn: string | number): void {
    this.libriService.getByIsbn(isbn.toString()).subscribe({
      next: (data) => this.libro = data,
      error: (err) => console.error(err)
    });
  }

  caricaRecensioniLibro(isbn: string | number): void {
    this.recensioniService.getByIsbn(isbn.toString()).subscribe({
      next: (data) => this.recensioni = data
    });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  Logout(){
    this.router.navigate(['/']); 
    let utente = this.utentiService.getUtenteLoggato();
    if(utente){
      utente = null;
      this.utentiService.setUtenteLoggato(utente);
      alert("Logout effettuato con successo!");
    }
  }

  goToKart() {
    this.menuAperto = false;
    this.router.navigate(['/kart']); 
  }

  listaUtenti: Utenti[] = [];

  prenotaLibro(){
    if(!this.bibliotecaSelezionata) {
      alert("Seleziona una biblioteca prima di prenotare!");
      return;
    }
    if(!this.copiaService.disponibile(this.isbnLibro.toString(), this.bibliotecaSelezionata.toString())){
      alert("Mi dispiace, non ci sono copie disponibili in questa biblioteca.");
      return;
    }
    
    const utente = this.utentiService.getUtenteLoggato();
    if(utente && utente.ruolo === 'UTENTE'){
      if(this.isbnLibro){
        this.prenotazioniService.save(this.isbnLibro, utente.username).subscribe({
          next: (data) => {console.log("Prenotazione salvata:", data)},
          error: (err) => console.error(err)
        });
      }
      
      alert(`Prenotato: ${this.libro?.titolo}`);
      

    }else{
      alert("Devi essere loggato per prenotare un libro.");
    }
  }


}