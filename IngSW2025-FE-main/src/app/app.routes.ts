import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import {SampleEntitiesComponent} from './component/sample-entities/sample-entities.component';
import { UtentiListComponent } from './component/utenti-list/utenti-list.component';
import { LibriComponent } from './component/libri/libri.component';
import { AccessPageComponent } from './component/access-page/access-page.component';
import { UtBaseComponent } from './component/ut-base/ut-base.component';
import { DetailsLibroComponent } from './component/details-libro/details-libro.component';
import { KartComponent } from './component/kart/kart.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample-entities', component: SampleEntitiesComponent },
  { path: 'utenti', component: UtentiListComponent },
  { path: 'libri', component: LibriComponent },
  { path: 'login', component: AccessPageComponent },
  { path: 'ut-base', component: UtBaseComponent },
  { path: 'details/:id', component: DetailsLibroComponent },
  { path: 'kart', component: KartComponent }
];

