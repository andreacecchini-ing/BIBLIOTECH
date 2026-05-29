import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Libri } from '../../dto/libri.model'; 
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; 
import { UtentiService } from '../../service/utenti.service'; 
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { H } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-bibliotecario',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bibliotecario.component.html',
  styleUrl: './bibliotecario.component.scss'
})

export class BibliotecarioComponent implements OnInit {
  tuttiILibri: Libri[] = [];
  listaLibri: Libri[] = [];
  paginaCorrente: number = 0;
  dimensionePagina: number = 40; 
  totalePagine: number = 0;
  genereSelezionato: string = '';
  criterioOrdinamento: string = 'titolo';
  bibliotecaSelezionata: string = '';

  constructor(private router: Router, private libriService: LibriService, private utentiService: UtentiService, private http: HttpClient) {}

  goToBookManagement() {
    this.menuAperto = false;
    this.router.navigate(['/book-management']); 
  }
  
  goToHome() {
    this.router.navigate(['/']); 
    const utente = null; 
    this.utentiService.setUtenteLoggato(utente);
    alert("Logout effettuato con successo!");
  }
  goToDetails(id: number) {
    this.router.navigate(['/details', id]);
  }
  
  aggiornaPagina(): void {
    const inizio = this.paginaCorrente * this.dimensionePagina;
    const fine = inizio + this.dimensionePagina;
    this.listaLibri = this.tuttiILibri.slice(inizio, fine);
    window.scrollTo(0, 0);
  }
  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.aggiornaPagina();
    }
  }
  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.aggiornaPagina();
    }
  }

  menuAperto: boolean = false;
  toggleMenu(): void {
    this.menuAperto = !this.menuAperto;
  }

  ngOnInit() {
    this.caricaLibriDalDatabase();
    const utente = this.utentiService.getUtenteLoggato();

    if (utente) {
      console.log("Accesso confermato per:", utente.email);

      /*this.libriService.getAll().subscribe({
        next: (data) => {
          this.listaLibri = data;
          console.log("Libri caricati con successo");
        },
        error: (err) => {
          console.error("Errore nel caricamento libri:", err);
        }
      });*/
    }else{
      console.warn("Nessun utente loggato, reindirizzamento...");
      this.router.navigate(['/login']);
    }
  }

  caricaLibriDalDatabase(): void {
    const url = `http://localhost:8080/api/libri?page=${this.paginaCorrente}&size=${this.dimensionePagina}&genere=${this.genereSelezionato}&ordinaPer=${this.criterioOrdinamento}`;
  
    this.http.get<any>(url).subscribe(response => {
      this.listaLibri = response.content;
      this.totalePagine = response.totalPages;
    });
  }

  onChangeFiltroGenere(event: any): void {
    this.genereSelezionato = event.target.value;
    this.paginaCorrente = 0;
    this.caricaLibriDalDatabase();
  }

  onChangeOrdinamento(event: any): void {
    this.criterioOrdinamento = event.target.value;
    this.paginaCorrente = 0;
    this.caricaLibriDalDatabase();
  }

  onChangeFiltroBiblioteca(event: any): void {
  }

  paginaPrecedenteFO(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.caricaLibriDalDatabase();
      window.scrollTo(0, 0);
    }
  }
  paginaSuccessivaFO(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.caricaLibriDalDatabase();
      window.scrollTo(0, 0);
    }
  }

  openLibro(libroAperto: any): void {
    console.log('Navigazione verso i dettagli del libro:', libroAperto.titolo);
    this.router.navigate(['/details-libro', libroAperto.isbn]);
  }

}
