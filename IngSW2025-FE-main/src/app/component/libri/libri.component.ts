import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';


@Component({
  selector: 'app-libri',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './libri.component.html',
  styleUrl: './libri.component.scss'
})
export class LibriComponent implements OnInit {
    listaLibri: Libri[] = [];
    
      constructor(private libriService: LibriService) {}
    
      ngOnInit(): void {
        this.libriService.getAll().subscribe(data => {
          this.listaLibri = data;
          console.log('Dati ricevuti:', data); 
        });
      }

      elimina(id: any): void {
        if(confirm("Sei sicuro di voler eliminare questo libro?")) {
          this.libriService.delete(id).subscribe(() => {
            this.ngOnInit(); 
          });
        }
      }

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
