import { Component } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Card } from '../../ui/card/card';
import { Monstera } from '../../ui/monstera/monstera';

@Component({
  imports: [Card, Monstera, NgOptimizedImage],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {}
