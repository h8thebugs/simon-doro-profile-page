import { Component } from '@angular/core';
import { FloatOnScroll } from '../../directives/float-on-scroll';
import { Fingerprint } from '../../ui/fingerprint/fingerprint';
import { Tree } from '../../ui/tree/tree';
import { GraduationCap } from '../../ui/graduation-cap/graduation-cap';

@Component({
  imports: [Fingerprint, Tree, GraduationCap, FloatOnScroll],
  selector: 'app-cv',
  styleUrl: './cv.css',
  templateUrl: './cv.html',
})
export class Cv {}
