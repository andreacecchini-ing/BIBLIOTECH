import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Libri } from '../../dto/libri.model';
import { LibriService } from '../../service/libri.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit {

  listaLibri: Libri[] = []; 

  constructor(private router: Router, private libriService: LibriService) {}

  goToLogin() {
    this.router.navigate(['/login']); 
  }
  goToHome() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.libriService.getAll().subscribe(data => {
      this.listaLibri = data;
    });
  }
  
  
}