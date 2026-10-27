import { Component } from '@angular/core';
import { Button } from '../../ui/button/button';
import { RaisedButton } from '../../ui/raised-button/raised-button';

@Component({
  imports: [Button, RaisedButton],
  selector: 'app-cv',
  styleUrl: './cv.css',
  templateUrl: './cv.html',
})
export class Cv {}
