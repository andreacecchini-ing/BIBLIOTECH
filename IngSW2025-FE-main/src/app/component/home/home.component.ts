import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { H } from '@angular/cdk/keycodes';
import { Biblioteche } from '../../dto/biblioteche.model';
import { BibliotecheService } from '../../service/biblioteche.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  tuttiILibri: Libri[] = [];
  listaLibri: Libri[] = [];
  paginaCorrente: number = 0;
  dimensionePagina: number = 40; 
  totalePagine: number = 0;
  genereSelezionato: string = '';
  criterioOrdinamento: string = 'titolo';
  bibliotecaSelezionata: string = '';

  constructor(private router: Router, private libriService: LibriService, private http: HttpClient, private bibliotecheService: BibliotecheService) {}

  goToLogin() {
    this.router.navigate(['/login']);
  }
  goToRegister() {
    this.router.navigate(['/login'], { queryParams: { register: 'true' } });
  }
  goToHome() {
    this.router.navigate(['/']);
    window.scrollTo(0, 0);
  }

  /*ngOnInit(): void {
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }*/
  /*ngOnInit(): void {
    this.libriService.getAll().subscribe(data => {
      this.tuttiILibri = data;
      this.totalePagine = Math.ceil(this.tuttiILibri.length / this.dimensionePagina);
      this.aggiornaPagina();
    });
  }*/
 
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
  ruoloUtente: string = 'ospite'; 
  
  toggleMenu(): void {
    this.menuAperto = !this.menuAperto;
  }

  azioneLogout(): void {
    this.ruoloUtente = 'ospite';
    this.menuAperto = false;
    this.router.navigate(['/login']);
  }

  vaiAlCarrello(): void {
    this.menuAperto = false;
    this.router.navigate(['/carrello']);
  }

  aggiungiLibro(): void {
    this.menuAperto = false;
    //this.router.navigate(['/aggiungi-libro']);
  }

  listaBiblioteche: Biblioteche[] = [];

  ngOnInit(): void {
    this.caricaLibriDalDatabase();
    
    this.bibliotecheService.getAll().subscribe(data => {
      this.listaBiblioteche = data;
    });
  }

  caricaLibriDalDatabase(): void {
    const url = `http://localhost:8080/api/libri?page=${this.paginaCorrente}&size=${this.dimensionePagina}&genere=${this.genereSelezionato}&ordinaPer=${this.criterioOrdinamento}`;
  
    this.http.get<any>(url).subscribe(response => {
      this.listaLibri = response.content;
      this.totalePagine = response.totalPages;
      this.listaLibriFiltrati = this.listaLibri; 
      console.log('Dati ricevuti dal server:', response);
      this.filtraLibri();
    });
  }

  listaLibriFiltrati: any[] = [];
  titoloFiltro: string = '';
  filtraLibri() {
    if (!this.titoloFiltro) {
      this.listaLibriFiltrati = this.listaLibri;
    } else {
      this.listaLibriFiltrati = this.listaLibri.filter(libro => 
        libro.titolo.toLowerCase().includes(this.titoloFiltro.toLowerCase())
      );
    }
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