import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utenti } from '../../dto/utenti.model'; 
import { UtentiService } from '../../service/utenti.service';
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; 
import { RecensioniService } from '../../service/recensioni.service';

@Component({
  selector: 'app-kart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kart.component.html',
  styleUrl: './kart.component.scss'
})
export class KartComponent implements OnInit {
  constructor(private router: Router, private libriService: LibriService, private recensioniService: RecensioniService) {}
  
  listaLibri: Libri[] = [];
  libriPrenotati: Libri[] = [];
  listaRecensioni: any[] = [];

  goToHome() {
    this.router.navigate(['/']);
  }
  goToUtBase(){
    this.router.navigate(['/ut-base']);
  }
  goToProfile(){
    console.log("Navigazione al profilo utente");
  }
  mode: 'prenotazioni' | 'recensioni' = 'prenotazioni';
  
  menuAperto: boolean = false;

  toggleMenu(): void {
    this.menuAperto = !this.menuAperto;
  }

  ngOnInit(): void {
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });

    this.libriService.getPrenotazioniUtente().subscribe(data =>{
      this.libriPrenotati = data;
    });

    this.recensioniService.getRecensioniUtente().subscribe(data =>{
      this.listaRecensioni = data;
    });
  }
}