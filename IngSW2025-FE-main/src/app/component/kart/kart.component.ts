import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Utenti } from '../../dto/utenti.model'; 
import { UtentiService } from '../../service/utenti.service';
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-kart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kart.component.html',
  styleUrl: './kart.component.scss'
})
export class KartComponent implements OnInit {
  constructor(private router: Router, private libriService: LibriService) {}
  
  listaLibri: Libri[] = []; 

  goToUtBase(){
    this.router.navigate(['/ut-base']);
  }
  ngOnInit(): void {
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }
}
