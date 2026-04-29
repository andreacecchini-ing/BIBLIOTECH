import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule per ngModel (tentativo non concluso perché non riesco a farlo funzionare)
import { Utenti } from '../../dto/utenti.model'; // Assicurati che il percorso sia giusto
import { UtentiService } from '../../service/utenti.service';
import { Libri } from '../../dto/libri.model'; // Assicurati che il percorso sia giusto
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; // Importa il Router //la uso per passare la possibilità di accesso

@Component({
  selector: 'app-kart',
  standalone: true,
  imports: [CommonModule, FormsModule],//FormsModule non funziona e al momento non implementa nulla
  templateUrl: './kart.component.html',
  styleUrl: './kart.component.scss'
})
export class KartComponent implements OnInit {
  constructor(private router: Router, private libriService: LibriService) {}
  
  listaLibri: Libri[] = []; 

  goToUtBase(){
    this.router.navigate(['/ut-base']); // Naviga verso la rotta 'ut-base'
  }
  ngOnInit(): void {
    // Carica i dati dal backend
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }
}
