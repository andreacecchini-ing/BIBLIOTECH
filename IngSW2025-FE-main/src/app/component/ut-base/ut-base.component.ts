import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Serve per usare *ngFor nell'HTML
import { Libri } from '../../dto/libri.model'; // Assicurati che il percorso sia giusto
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; // Importa il Router //la uso per passare la possibilità di accesso

@Component({
  selector: 'app-ut-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ut-base.component.html',
  styleUrl: './ut-base.component.scss'
})

export class UtBaseComponent implements OnInit {
  // QUESTA È LA RIGA MANCANTE:
  listaLibri: Libri[] = []; 

  constructor(private router: Router, private libriService: LibriService) {}

  goToKart() {
    this.router.navigate(['/kart']); // Naviga verso la rotta 'kart'
  }

  goToHome() {
    this.router.navigate(['/']); // Naviga verso la rotta 'home'
  }

  goToDetails(id: number) {
    this.router.navigate(['/details', id]); // Naviga verso la rotta 'details' con l'id del libro
  }
  
  ngOnInit(): void {
    // Carica i dati dal backend
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }
  
  
}