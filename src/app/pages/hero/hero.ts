import { Component } from '@angular/core';
import { Button } from '../../ui/button/button';
import { Card } from '../../ui/card/card';
import { RaisedButton } from '../../ui/raised-button/raised-button';

@Component({
  imports: [Button, RaisedButton, Card],
  selector: 'app-hero',
  styleUrl: './hero.css',
  templateUrl: './hero.html',
})
export class Hero {}
