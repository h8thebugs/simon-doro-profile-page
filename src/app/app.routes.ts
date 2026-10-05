import { Routes } from '@angular/router';
import { Booking } from './pages/booking/booking';
import { Cv } from './pages/cv/cv';
import { Hero } from './pages/hero/hero';
import { TherapyProcess } from './pages/therapy-process/therapy-process';

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: Hero },
  { path: 'cv', component: Cv },
  { path: 'therapy-process', component: TherapyProcess },
  { path: 'booking', component: Booking },
];
