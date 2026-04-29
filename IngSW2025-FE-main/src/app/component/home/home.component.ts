import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Serve per usare *ngFor nell'HTML
import { Libri } from '../../dto/libri.model'; // Assicurati che il percorso sia giusto
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; // Importa il Router //la uso per passare la possibilità di accesso

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {
  // QUESTA È LA RIGA MANCANTE:
  listaLibri: Libri[] = []; 

  constructor(private router: Router, private libriService: LibriService) {}

  goToLogin() {
    this.router.navigate(['/login']); // Naviga verso la rotta 'login'
  }
  goToHome() {
    this.router.navigate(['/']); // Naviga verso la rotta 'home'
  }

  ngOnInit(): void {
    // Carica i dati dal backend
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }
  
  
}