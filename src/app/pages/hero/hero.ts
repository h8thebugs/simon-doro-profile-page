import { Component } from '@angular/core';
import { Button } from '../../ui/button/button';
import { Card } from '../../ui/card/card';
import { Monstera } from '../../ui/monstera/monstera';
import { RaisedButton } from '../../ui/raised-button/raised-button';

@Component({
  imports: [Button, RaisedButton, Card, Monstera],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {}
