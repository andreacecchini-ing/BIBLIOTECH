import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utenti } from '../../dto/utenti.model'; 
import { UtentiService } from '../../service/utenti.service';
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; 
import { RecensioniService } from '../../service/recensioni.service';
import { Biblioteche } from '../../dto/biblioteche.model';
import { BibliotecheService } from '../../service/biblioteche.service';
import { Prenotazione } from '../../dto/prenotazioni.model';
import { PrenotazioniService } from '../../service/prenotazioni.service';
import { CopieLibri } from '../../dto/copie-libri.model';
import { CopiaService } from '../../service/copia.service';

@Component({
  selector: 'app-book-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-management.component.html',
  styleUrl: './book-management.component.scss'
})
export class BookManagementComponent implements OnInit {
  listaLibri: Libri[] = [];
  listaBiblioteche: Biblioteche[] = [];
  nomeBiblioteca: string = 'Biblioteca Centrale';
  menuAperto: boolean = false;

  constructor(private router: Router, private libriService: LibriService, private bibliotecheService: BibliotecheService) {}

  goToHome(): void { this.router.navigate(['/']); }
  goToUtBase(): void { this.router.navigate(['/ut-base']); }
  goToProfile(): void { this.router.navigate(['/']); }

  ngOnInit(): void {
    this.caricaLibri();
    this.caricaBiblioteche();
    console.log(this.listaLibri);
  }

  caricaLibri(): void {
    console.log(this.listaLibri);
    this.libriService.getAll().subscribe((data: any) => {
      this.listaLibri = data.content;
      console.log('Dati ricevuti dal server:', data);
    });
  }
  caricaBiblioteche(): void {
    console.log(this.listaBiblioteche);
    this.bibliotecheService.getAll().subscribe((data: Biblioteche[]) => {
      this.listaBiblioteche = data;
      console.log('Dati ricevuti dal server:', data);
    });
  }

  rimuoviLibro(isbn: any): void {
    /*if(confirm('Sei sicuro di voler rimuovere questo libro?')) {
      this.libriService.deleteLibro(isbn).subscribe(() => {
        this.caricaLibri();
      });
    }*/
  }



  aggiungiLibroAperto: boolean = false;
  nuovoLibro: any = { isbn: '', titolo: '', autore: '', anno: '', genere: '', trama: '' };


  aggiungiLibro(): void {
    this.aggiungiLibroAperto = true;
  }

  chiudiOverlay(): void {
    this.aggiungiLibroAperto = false;
  }

  paginaCorrente: number = 0;
  totalePagine: number = 0;

  paginaPrecedente(): void {
    if (this.paginaCorrente > 0) {
      this.paginaCorrente--;
      this.caricaLibri();
    }
  }

  paginaSuccessiva(): void {
    if (this.paginaCorrente < this.totalePagine - 1) {
      this.paginaCorrente++;
      this.caricaLibri();
    }
  }

  salvaLibro(): void {
    this.libriService.create(this.nuovoLibro).subscribe(() => {
      this.caricaLibri();
      this.chiudiOverlay();
      this.nuovoLibro = { titolo: '', autore: '', isbn: '', genere: '' };
    });
  }

  toggleMenu(): void { this.menuAperto = !this.menuAperto; }
}