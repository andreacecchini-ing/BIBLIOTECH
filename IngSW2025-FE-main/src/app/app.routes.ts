import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { AccessPageComponent } from './component/access-page/access-page.component';
import { UtBaseComponent } from './component/ut-base/ut-base.component';
import { DetailsLibroComponent } from './component/details-libro/details-libro.component';
import { KartComponent } from './component/kart/kart.component';
import { BibliotecarioComponent } from './component/bibliotecario/bibliotecario.component';
import { BookManagementComponent } from './component/book-management/book-management.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: AccessPageComponent },
  { path: 'ut-base', component: UtBaseComponent },
  { path: 'details-libro/:id', component: DetailsLibroComponent },
  { path: 'kart', component: KartComponent },
  { path: 'bibliotecario', component: BibliotecarioComponent },
  { path: 'book-management', component: BookManagementComponent },
];

