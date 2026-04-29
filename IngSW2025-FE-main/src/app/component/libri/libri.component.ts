import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Serve per usare *ngFor nell'HTML
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';


@Component({
  selector: 'app-libri',
  standalone: true,
  imports: [CommonModule], // Fondamentale per vedere la lista
  templateUrl: './libri.component.html',
  styleUrl: './libri.component.scss'
})
export class LibriComponent implements OnInit {
    listaLibri: Libri[] = []; // Qui verranno salvati i dati
    
      constructor(private libriService: LibriService) {} // Inietto il service
    
      ngOnInit(): void {
        // Chiamo il backend appena la pagina è pronta
        this.libriService.getAll().subscribe(data => {
          this.listaLibri = data;
          console.log('Dati ricevuti:', data); // Utile per controllare in console (F12)
        });
      }
      // Funzione per eliminare
      elimina(id: any): void {
        if(confirm("Sei sicuro di voler eliminare questo libro?")) {
          this.libriService.delete(id).subscribe(() => {
            // Ricarica la lista dopo l'eliminazione per "pulire" la tabella
            this.ngOnInit(); 
          });
        }
      }
      // Funzione per aggiungere (esempio semplice)
      aggiungiNuovo(): void {
        const titolo = prompt("Titolo:");
        const autore = prompt("Autore:");
        const anno = prompt("Anno:");
        const genere = prompt("Genere:");
        if (titolo && autore && anno && genere) {
          const nuovo = { titolo, autore, anno, genere } as Libri;
          this.libriService.create(nuovo).subscribe(() => {
            this.ngOnInit();
          });
        }
      }
}
