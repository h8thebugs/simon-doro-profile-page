import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FloatOnScroll } from '../../directives/float-on-scroll';
import { Card } from '../../ui/card/card';
import { Monstera } from '../../ui/monstera/monstera';

@Component({
  imports: [Card, Monstera, NgOptimizedImage, FloatOnScroll, RouterLink],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {}
