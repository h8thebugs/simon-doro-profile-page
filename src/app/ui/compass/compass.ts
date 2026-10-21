import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-compass',
  styleUrl: './compass.css',
  templateUrl: './compass.html',
})
export class Compass {
  selected = input<boolean>(false);
  color = input<string>('currentColor');
}
